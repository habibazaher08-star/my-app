import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex w-full h-screen justify-center align-center">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Please Wait...</ItemTitle>
        </ItemContent>
        
      </Item>
    </div>
  )
}
