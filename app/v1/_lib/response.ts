import { NextResponse } from 'next/server'

export function unauthorized(message = 'unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 })
}

