import userImage from '../../../assets/images/user.webp'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import Link from "next/link"

type DropdownMenuBasicProps = {
  logOut: () => void
}

export function DropdownMenuBasic({logOut}: DropdownMenuBasicProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Image src={userImage} alt='user' width={30} height={30}></Image>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          
          
          <DropdownMenuItem>
            <span onClick={logOut}>Logout</span>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
