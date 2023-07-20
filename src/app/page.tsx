import { db } from '@/db'
import { users } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export default async function Home() {
  const allUsers = await db.select().from(users)

  async function addUser(data: FormData) {
    'use server'

    console.log(data.get('Name'))

    const fullName = data.get('name')?.toString()
    const phone = data.get('phone')?.toString()

    await db.insert(users).values({
      fullName,
      phone,
    })

    revalidatePath('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-900 text-zinc-50">
      <pre>{JSON.stringify(allUsers, null, 2)}</pre>
      <form action={addUser} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="bg-zinc-800"
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          className="bg-zinc-800"
        />

        <button type="submit">Create</button>
      </form>
    </div>
  )
}
