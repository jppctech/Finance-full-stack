"use client"

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Home() {
  const { onOpen } = useNewAccount();


  return (
    <div>
      still worlking, go to accounts
    </div>
  );
}
