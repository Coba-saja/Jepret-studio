// api/generate.js
// Fungsi ini berjalan di server (bukan di browser), supaya API key aman
// dan tidak terlihat oleh pengguna website.

function stripDataUrl(dataUrl) {
  var idx = dataUrl.indexOf("base64,");
  return idx >= 0 ? dataUrl.slice(idx + 7) : dataUrl;
}

function mimeOf(dataUrl) {
  var match = /^data:(.*?);base64,/.exec(dataUrl);
  return match ? match[1] : "image/jpeg";
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    var body = req.body;
    // Vercel biasanya sudah otomatis parse JSON, tapi jaga-jaga:
    if (typeof body === "string") {
      body = JSON.parse(body);
    }
    var prompt = body.prompt;
    var image1 = body.image1;
    var image2 = body.image2;

    var apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Server belum dikonfigurasi: GEMINI_API_KEY belum diatur di Vercel." });
      return;
    }
    if (!prompt || !image1) {
      res.status(400).json({ error: "Prompt dan Foto 1 wajib diisi." });
      return;
    }

    var parts = [{ text: prompt }];
    parts.push({ inline_data: { mime_type: mimeOf(image1), data: stripDataUrl(image1) } });
    if (image2) {
      parts.push({ inline_data: { mime_type: mimeOf(image2), data: stripDataUrl(image2) } });
    }

    // Nama model bisa diganti lewat environment variable GEMINI_IMAGE_MODEL
    // kalau suatu saat Google mengganti nama modelnya.
    var model = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image";
    var url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent";

    var geminiRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: parts }],
        generationConfig: { responseModalities: ["IMAGE"] }
      })
    });

    var data = await geminiRes.json();

    if (!geminiRes.ok) {
      var msg = (data && data.error && data.error.message) || "Gagal memanggil Gemini API.";
      res.status(geminiRes.status).json({ error: msg });
      return;
    }

    var candidateParts = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
    var imagePart = candidateParts.find(function (p) { return p.inline_data || p.inlineData; });
    var inline = imagePart && (imagePart.inline_data || imagePart.inlineData);

    if (!inline) {
      res.status(502).json({ error: "Gemini tidak mengembalikan gambar. Coba ubah foto atau shortcut." });
      return;
    }

    var resultMime = inline.mime_type || inline.mimeType || "image/png";
    var resultBase64 = inline.data;

    res.status(200).json({ image: "data:" + resultMime + ";base64," + resultBase64 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan di server: " + err.message });
  }
};
