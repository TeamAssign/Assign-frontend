type LoaderProps = {
  size?: 's' | 'm' | 'l'
}

const Loader = ({ size = 'm' }: LoaderProps) => {
  const sizeClasses = {
    s: 'w-8 h-8',
    m: 'w-12 h-12',
    l: 'w-16 h-16',
  }

  return (
    <div
      className={`${sizeClasses[size]} border-4 border-gray-300 rounded-full border-t-main animate-spin`}
    />
  )
}

export default Loader
