import { useCallback, useEffect, useRef } from 'react'

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  obsersver: IntersectionObserver,
) => void

/**
 * IntersectionObserver를 사용하여 요소의 화면 진입을 감지하는 커스텀 훅입니다.
 *
 * @param onIntersect - 요소가 화면에 들어왔을 때 실행될 콜백 함수
 * @param options - IntersectionObserver 옵션 (root, threshold 등)
 *
 * @example
 * // 무한 스크롤 구현 예시
 * const ref = useIntersect((entry, observer) => {
 *   observer.unobserve(entry.target) // 현재 요소 관찰 중지
 *   if (hasNextPage && !isFetching) {
 *     fetchNextPage() // 다음 페이지 데이터 로드
 *   }
 * })
 *
 * return <div ref={ref}>감지할 요소</div>
 */

const useIntersectionObserver = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<HTMLDivElement>(null)

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer)
      })
    },
    [onIntersect],
  )

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(callback, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options, callback])
  return ref
}

export default useIntersectionObserver
