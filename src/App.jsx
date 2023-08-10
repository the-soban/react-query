import './App.css'
import { useQuery, useMutation } from '@tanstack/react-query'

const POSTS = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
]

function App() {
    const postsQuery = useQuery({
        queryKey: ['posts'], //first thing to give to the query: a unique identifier key
        queryFn: () => wait(1000).then(() => [...POSTS]), //second thing: a function that fetches the actual data, could be an axios request too, or a fetch method call
    })

    if (postsQuery.isLoading) {
        return <h1>Loading...</h1>
    }
    if (postsQuery.isError) {
        return <h3>{JSON.stringify(postsQuery.error)}</h3>
    }

    return (
        <>
            <h1>Hello World</h1>
            {postsQuery.data.map((post) => (
                <div key={post.id}>{post.title}</div> //to loop through the data show each of our post
            ))}
        </>
    )
}

const wait = (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
}

export default App
