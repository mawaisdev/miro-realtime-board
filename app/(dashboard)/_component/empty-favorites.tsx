import Image from 'next/image'

export const EmptyFavorites = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image src='/empty-favorites.svg' alt='Empty' width={140} height={140} />
      <h2 className='font-semibold text-2xl mt-6'>No favorite boards!</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Try adding a board as favorite...
      </p>
    </div>
  )
}
