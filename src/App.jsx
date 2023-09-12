import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './App.css';

const POSTS = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
];

const App = () => {
    const queryClient = useQueryClient();

    //THIS IS HOW A QUERY WORKS:
    const postsQuery = useQuery({
        queryKey: ['posts'], //this is a unique identifier for this query, and it always accepts an array as a value
        queryFn: () => wait(1000).then(() => [...POSTS]), //this is the actual query function that'll be performed, and it always accepts a promise
        // queryFn: () => Promise.reject('This is error message'), //this message will be returned if there's error
    });

    //THIS IS HOW A MUTATION WORKS:
    const newPostsMutation = useMutation({
        mutationFn: (title) => {
            //just like useQuery, useMutation takes in a mutation function that always returns a promise and performs what the actual mutation is supposed to do
            return wait(1000).then(() =>
                POSTS.push({
                    id: crypto.randomUUID(),
                    title,
                })
            );
        },
        onSuccess: queryClient.invalidateQueries(['posts']), //this will invalidate any previous queries that are rendered by useQuery and refetch the data
    });

    if (postsQuery.isLoading) {
        return <h2>Loading, please wait...</h2>;
    }
    if (postsQuery.isError) {
        return <pre>{JSON.stringify(postsQuery.error)}</pre>; //shows an error message if there's an error
    }
    console.log(POSTS);

    return (
        <div>
            {postsQuery.data.map((post) => (
                <div key={post.id}>{post.title}</div> //now if our query is successful, then this data will be returned cause the query being successful means the data would be already fetched
            ))}
            <button
                disabled={newPostsMutation.isLoading} //this will disable the button if the mutation function is in loading state
                onClick={() => newPostsMutation.mutate('Newly added post')}
            >
                Add New Post
            </button>
        </div>
    );
};

const wait = (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration));
};

export default App;
