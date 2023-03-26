// import { json } from '@remix-run/node'
// import type { LoaderArgs } from '@remix-run/node'
// import { useLoaderData } from '@remix-run/react'
// import { sdk } from '~/libs/client'

// export const loader = async ({ params }: LoaderArgs) => {
//   const { movieId } = params
//   const { searchMovieByTitle } = await sdk.searchMovieByTitle({
//     title: search.get('q') || '',
//   })
//   const post = await store.getPost(!!movieId ? movieId : '')

//   return json(post)
// }

// export default function PostDetail() {
//   const post = useLoaderData<typeof loader>()
//   return (
//     <main className="mx-auto max-w-4xl">
//       <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
//       <p className="text-md">{post.description}</p>
//     </main>
//   )
// }
