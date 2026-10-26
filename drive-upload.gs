/**
 * Interactive Park Book — PDF upload Web App
 * Target folder: Grok / Playing in the Park
 * Folder ID: 1hKJXNAaMB9BjpHD-Kg4bPDIxDUuPQ168
 *
 * Deploy (one-time, as Charlie):
 * 1. https://script.google.com → New project
 * 2. Delete any stub code; paste this entire file → Save (Ctrl/Cmd+S)
 * 3. Deploy → New deployment → Type: Web app
 * 4. Description: "Park book PDF upload"
 * 5. Execute as: Me
 * 6. Who has access: Anyone
 * 7. Deploy → Authorize if prompted → Copy the Web app URL
 *    (ends with /exec)
 * 8. Paste that URL into the book's Setup → "Save Drive URL"
 *    AND (for all devices) into TEACHER_DRIVE_CONFIG.webhookUrl in index.html,
 *    then commit + push so GitHub Pages picks it up.
 *
 * Test: open the /exec URL in a browser — you should see {"status":"ok","service":"park-book-drive"}.
 */

var TARGET_FOLDER_ID = '1hKJXNAaMB9BjpHD-Kg4bPDIxDUuPQ168';

function doGet(e) {
  return jsonOut_({
    status: 'ok',
    service: 'park-book-drive',
    folderId: TARGET_FOLDER_ID,
    folderPath: 'Grok/Playing in the Park'
  });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut_({ status: 'error', message: 'Empty body' });
    }

    var raw = e.postData.contents;
    var data;
    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      // Some clients send text/plain; still expect JSON text.
      return jsonOut_({ status: 'error', message: 'Invalid JSON body' });
    }

    var b64 = data.pdfBase64 || data.pdf || '';
    if (!b64) {
      return jsonOut_({ status: 'error', message: 'Missing pdfBase64' });
    }
    // Strip data-URI prefix if a client sent the whole data URL
    var comma = b64.indexOf(',');
    if (b64.indexOf('base64') !== -1 && comma !== -1) {
      b64 = b64.substring(comma + 1);
    }

    var folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    var bytes = Utilities.base64Decode(b64);
    var name = (data.filename || 'Storybook.pdf').toString();
    if (!/\.pdf$/i.test(name)) name += '.pdf';
    // Soften unsafe characters
    name = name.replace(/[\/\\?%*:|"<>]/g, '_');

    var blob = Utilities.newBlob(bytes, 'application/pdf', name);
    var file = folder.createFile(blob);

    // Optional description metadata
    var bits = [];
    if (data.studentName) bits.push('Student: ' + data.studentName);
    if (data.mainCharacter) bits.push('Main: ' + data.mainCharacter);
    if (data.otherCharacter) bits.push('Friend: ' + data.otherCharacter);
    if (bits.length) file.setDescription(bits.join(' | '));

    return jsonOut_({
      status: 'ok',
      fileId: file.getId(),
      url: file.getUrl(),
      name: file.getName()
    });
  } catch (err) {
    return jsonOut_({
      status: 'error',
      message: String(err && err.message ? err.message : err)
    });
  }
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
