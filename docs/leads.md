# Leads (Book a workshop)

Enquiries from `/work-with-us` are stored in Sanity as **Lead** documents (private dataset) and managed at
**https://rawdraftstrategy.vercel.app/admin**.

## Setup (once)

In Vercel → rawdraftstrategy → Settings → Environment Variables, add and redeploy:

- `ADMIN_PASSWORD`: the dashboard password, 8+ characters. Changing it signs everyone out.
- `SANITY_API_WRITE_TOKEN`: the Sanity token (see docs/sanity.md). Leads are written and read with it.

## Using the dashboard

- **Active** shows what needs attention, most urgent first. Urgency is suggested from when they need the
  session (and nudged up by an approved budget); change it from the dropdown and the change sticks.
- **Call by** is the date to have the discovery call by: 2 working days for high urgency, 5 for medium, 10
  for low. Past that it turns orange.
- Decide on each new lead: **Schedule a call**, **Not now** or **Decline**.
- To schedule, pick a time and length, then **Book in Google Calendar**. A Calendar event opens with the
  client as a guest and their brief in the description; saving it there sends the invite. The lead moves
  to *Calls booked*. **.ics** downloads the same invite for other calendars; **Email** drafts a note proposing
  the time.
- After the call: **Mark done**. **Reopen** brings any closed lead back.
- **Private note** saves when you click away. Leads are also visible and editable in the Studio under Lead.
