const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// Input file and output folder
const filePath = "./index.html"; // change to your file path
const outputFolder = "./downloads"; // change to desired folder

// Create output folder if not exists
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

// Read file content
const fileContent = fs.readFileSync(filePath, "utf8");

// Regex to match URLs
const urlRegex = /https:\/\/d26kej74xcgneg\.cloudfront\.net\/.*?"/g;
const urls = fileContent.match(urlRegex);

if (!urls || urls.length === 0) {
    console.log("No URLs found.");
    process.exit(0);
}



console.log(`Found ${urls.length} URLs. Starting download...`);

// Function to download a single file
function downloadFile(url, outputPath) {
    const client = url.startsWith("https") ? https : http;
    console.log(url)

    // const options = {
    //     "headers": {
    //         "sec-ch-ua": "\"Chromium\";v=\"142\", \"Google Chrome\";v=\"142\", \"Not_A Brand\";v=\"99\"",
    //         "sec-ch-ua-mobile": "?0",
    //         "sec-ch-ua-platform": "\"Windows\""
    //     },
    //     "referrer": "https://brightchamps.com/",
    //     "body": null,
    // };
    // client.get(url, options, (res) => {
    //     console.log(res);
        
    //     if (res.statusCode === 200) {
    //         const fileStream = fs.createWriteStream(outputPath);
    //         res.pipe(fileStream);
    //         fileStream.on("finish", () => {
    //             fileStream.close();
    //             console.log(`Downloaded: ${outputPath}`);
    //         });
    //     } else {
    //         console.error(`Failed to download ${url} - Status: ${res.statusCode}`);
    //     }
    // }).on("error", (err) => {
    //     console.error(`Error downloading ${url}: ${err.message}`);
    // });
}

// Download all URLs
urls.forEach((url) => {
    const fileName = path.basename(url.split("?")[0]); // remove query params if any
    const outputPath = path.join(outputFolder, fileName);
    downloadFile(url.slice(0,-1), outputPath);
});
