import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-[#020026] flex items-center justify-center p-4">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-2xl"
          }
        }}
      />
    </div>
  )
}