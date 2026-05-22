import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Log for development — replace with CRM / webhook integration
    console.log('[lead]', JSON.stringify(body, null, 2))

    // TODO: forward to GoHighLevel / HubSpot / Zapier webhook
    // await fetch(process.env.CRM_WEBHOOK_URL!, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body),
    // })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[lead] error', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
