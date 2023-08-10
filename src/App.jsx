import './App.css'
import { useQuery, useMutation } from '@tanstack/react-query'

const POSTS = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
]

function App() {
    const postsQuery = useQuery({
        queryKey: ['posts'],
        queryFn: () => Promise.reject('I reject it!!'),
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
        </>
    )
}

const wait = (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
}

export default App
