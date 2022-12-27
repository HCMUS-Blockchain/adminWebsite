import { CollectionScreenDetail } from '@/components/games'
import { MainLayout } from '@/components/layout'
import { useRouter } from 'next/router'

function CreateQuizScreenDetail() {
  return <CollectionScreenDetail id={''} />
}

CreateQuizScreenDetail.Layout = MainLayout

export default CreateQuizScreenDetail
