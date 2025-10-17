# Error Codes Documentation

## Save Template Errors (ERR_SAVE_XXX)

### ERR_SAVE_000
**Description:** Unexpected error during template save  
**Cause:** Unknown/unhandled error  
**User Action:** Report error with full message to developer  
**Technical Details:** Check console for stack trace

### ERR_SAVE_001
**Description:** Empty template name  
**Cause:** User didn't enter template name  
**User Action:** Enter a valid template name  
**Technical Details:** Template name validation failed

### ERR_SAVE_002
**Description:** Cannot save empty template  
**Cause:** No elements on canvas  
**User Action:** Add at least one element before saving  
**Technical Details:** `elements.length === 0`

### ERR_SAVE_003
**Description:** Preview generation failed  
**Cause:** html2canvas failed to capture preview  
**User Action:** Template will save without preview, no action needed  
**Technical Details:** html2canvas error, non-critical

### ERR_SAVE_004
**Description:** localStorage save failed  
**Cause:** Browser storage error  
**User Action:** Check browser settings or clear storage  
**Technical Details:** localStorage.setItem() threw error

### ERR_SAVE_004_QUOTA
**Description:** Storage quota exceeded  
**Cause:** Browser storage is full  
**User Action:** Delete old templates or clear browser data  
**Technical Details:** QuotaExceededError (code 22)

### ERR_SAVE_005
**Description:** Analytics save failed  
**Cause:** Firebase or analytics error  
**User Action:** None (non-critical, template still saved)  
**Technical Details:** sendTemplateAnalytics() failed

---

## Copy JSON Errors (ERR_COPY_XXX)

### ERR_COPY_000
**Description:** Unexpected error during copy  
**Cause:** Unknown/unhandled error  
**User Action:** Try Download instead, report to developer  
**Technical Details:** Check console for stack trace

### ERR_COPY_001
**Description:** No JSON data to copy  
**Cause:** JSON output is empty  
**User Action:** Add elements and try again  
**Technical Details:** jsonData is empty or null

### ERR_COPY_002
**Description:** Clipboard API not available  
**Cause:** Browser doesn't support clipboard API  
**User Action:** Use Download button instead  
**Technical Details:** `navigator.clipboard` is undefined

### ERR_COPY_003
**Description:** Analytics failed (copy)  
**Cause:** Analytics tracking error  
**User Action:** None (non-critical, copy still worked)  
**Technical Details:** sendActionAnalytics() failed

### ERR_COPY_004
**Description:** Copy to clipboard failed  
**Cause:** Generic clipboard error  
**User Action:** Check browser permissions  
**Technical Details:** navigator.clipboard.writeText() rejected

### ERR_COPY_004_PERM
**Description:** Copy permission denied  
**Cause:** User denied clipboard permission  
**User Action:** Allow clipboard access in browser settings  
**Technical Details:** NotAllowedError from clipboard API

---

## Download JSON Errors (ERR_DOWNLOAD_XXX)

### ERR_DOWNLOAD_000
**Description:** Unexpected error during download  
**Cause:** Unknown/unhandled error  
**User Action:** Try Copy instead, report to developer  
**Technical Details:** Check console for stack trace

### ERR_DOWNLOAD_001
**Description:** No JSON data to download  
**Cause:** JSON output is empty  
**User Action:** Add elements and try again  
**Technical Details:** jsonData is empty or null

### ERR_DOWNLOAD_002
**Description:** Failed to prepare download file  
**Cause:** Blob creation failed  
**User Action:** Try again or copy JSON manually  
**Technical Details:** new Blob() threw error

### ERR_DOWNLOAD_003
**Description:** Failed to create download link  
**Cause:** URL.createObjectURL() failed  
**User Action:** Try again or contact developer  
**Technical Details:** URL creation error

### ERR_DOWNLOAD_004
**Description:** Failed to start download  
**Cause:** Download trigger failed  
**User Action:** Check browser download settings  
**Technical Details:** Download link creation or click failed

### ERR_DOWNLOAD_005
**Description:** Analytics failed (download)  
**Cause:** Analytics tracking error  
**User Action:** None (non-critical, download still worked)  
**Technical Details:** sendActionAnalytics() failed

---

## Load Template Errors (ERR_LOAD_XXX)

### ERR_LOAD_000
**Description:** Unexpected error during template load  
**Cause:** Unknown/unhandled error  
**User Action:** Report error with full message to developer  
**Technical Details:** Check console for stack trace

### ERR_LOAD_001
**Description:** Invalid template name  
**Cause:** Template name is empty or null  
**User Action:** Contact developer (shouldn't happen in normal use)  
**Technical Details:** Template name validation failed

### ERR_LOAD_002
**Description:** Template not found  
**Cause:** Template doesn't exist in storage  
**User Action:** Template may have been deleted, check My Templates list  
**Technical Details:** Template key not found in localStorage

### ERR_LOAD_003
**Description:** Template data is corrupted  
**Cause:** Invalid or missing elements array  
**User Action:** Delete and recreate template  
**Technical Details:** template.elements is not an array

### ERR_LOAD_004
**Description:** Template canvas data is missing  
**Cause:** Missing canvasSize object  
**User Action:** Delete and recreate template  
**Technical Details:** template.canvasSize is undefined

### ERR_LOAD_005
**Description:** Canvas settings load failed  
**Cause:** Error setting canvas properties  
**User Action:** Template will load with default canvas settings  
**Technical Details:** Error in cardElement property assignment

### ERR_LOAD_006
**Description:** Input update failed  
**Cause:** DOM input elements not found or error  
**User Action:** None (non-critical, template still loads)  
**Technical Details:** getElementById or value assignment failed

### ERR_LOAD_007
**Description:** Some elements failed to load  
**Cause:** Individual element data is corrupted  
**User Action:** Check which elements are missing, may need to recreate  
**Technical Details:** Error in createElementDiv for specific elements

---

## Error Code Format

All error codes follow the pattern: `ERR_[CATEGORY]_[NUMBER]`

- **Category:** SAVE, COPY, DOWNLOAD, LOAD, etc.
- **Number:** 
  - `000` = Unexpected/unhandled error
  - `001-099` = Specific error codes
  - Suffix (e.g., `_QUOTA`, `_PERM`) = Specific variant

---

## For Developers

### Adding New Error Codes

1. Choose appropriate category (SAVE, COPY, etc.)
2. Assign next available number
3. Add console.error with code in brackets: `[ERR_CATEGORY_XXX]`
4. Show user-friendly error with code: `showToast('❌ Message [ERR_CODE]', 'error')`
5. Document in this file

### Error Handling Pattern

```javascript
try {
    // Critical operation
    if (validationFails) {
        showToast('❌ User message [ERR_XXX_001]', 'error');
        return;
    }
    
    try {
        // Sub-operation (non-critical)
    } catch (subError) {
        console.error('Sub-operation failed [ERR_XXX_002]:', subError);
        // Optional: showToast if user needs to know
    }
    
    // Success
    showToast('✅ Success message', 'success');
    
} catch (error) {
    // Unexpected error
    console.error('Unexpected error [ERR_XXX_000]:', error);
    showToast(`❌ Unexpected error: ${error.message} [ERR_XXX_000]`, 'error');
}
```

### Best Practices

1. Always include error code in user-facing messages
2. Log full error details to console
3. Distinguish critical vs. non-critical errors
4. Provide actionable user guidance
5. Update this documentation when adding codes

