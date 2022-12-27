import { CollectionScreenDetail } from '@/components/games'
import { MainLayout } from '@/components/layout'
import { useRouter } from 'next/router'

function QuizScreenDetail() {
  const route = useRouter()
  const { id } = route.query

  return <CollectionScreenDetail id={id?.toString() || ''} />
}

QuizScreenDetail.Layout = MainLayout

export default QuizScreenDetail
