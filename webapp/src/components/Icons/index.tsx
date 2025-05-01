import { createElement } from 'react'
import { type IconBaseProps } from 'react-icons'
//import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { AiFillRedditCircle, AiOutlineReddit } from 'react-icons/ai'

const icons = {
  likeEmpty: AiOutlineReddit,
  likeFilled: AiFillRedditCircle,
}

export const Icon = ({ name, ...restProps }: { name: keyof typeof icons } & IconBaseProps) => {
  return createElement(icons[name], restProps)
}
