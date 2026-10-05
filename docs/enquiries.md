# Book a workshop → Google Sheet

The form on `/work-with-us` posts to `/api/enquiry`. That route forwards each enquiry to a small
Google Apps Script attached to the sheet, which appends a row. Until the two Vercel variables
below are set, the form says enquiries aren't connected yet and nothing is stored.

Sheet: **Raw Draft enquiries** in Google Drive. Rows go to its first tab. Columns:
received, name, email, org, role, help, topics, length, people, when, budget, notes, source, page.
`source` is the page the visitor came from before opening the form.

## Connect it (once)

1. Pick a secret: any long random string. Keep it out of the repo, which is public.
2. Open the sheet → **Extensions → Apps Script**. Replace the editor contents with
   `docs/enquiries-apps-script.gs`, and set `SECRET` to your string. Save.
3. **Deploy → New deployment** → type **Web app**. Execute as: **Me**. Who has access: **Anyone**.
   Deploy, approve the permissions prompt, and copy the URL ending in `/exec`.
4. In Vercel → project **rawdraftstrategy** → **Settings → Environment Variables**, add for Production
   (and Preview if you want to test there):
   - `ENQUIRY_SHEET_URL` = the `/exec` URL
   - `ENQUIRY_SECRET` = the same secret
5. Redeploy (Deployments → latest → Redeploy). Environment variables apply to new deployments only.
6. Send a test enquiry from the live site and check a row appears.

"Anyone" access means anyone with the URL can call the script, which is why it checks the secret.
The script also prefixes values starting with `=`, `+`, `-` or `@` so they can't run as formulas.

If you change the script later, use **Deploy → Manage deployments → Edit → New version**; the URL stays
the same.
