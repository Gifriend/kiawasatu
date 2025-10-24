import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gray-50">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Pendaftaran Berhasil</CardTitle>
            <CardDescription>Silakan cek email Anda untuk mengkonfirmasi akun</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-6">
              Kami telah mengirimkan email konfirmasi ke alamat email Anda. Silakan klik link di email untuk
              mengaktifkan akun Anda.
            </p>
            <Link href="/auth/login">
              <Button className="w-full">Kembali ke Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
