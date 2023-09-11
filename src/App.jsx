import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import './App.css';

const POSTS = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
];

const App = () => {
    const postsQuery = useQuery({
        queryKey: ['posts'], //this is a unique identifier for this query, and it always accepts an array as a value
        queryFn: () => wait(1000).then(() => [...POSTS]), //this is the actual query function that'll be performed, and it always accepts a promise
        // queryFn: () => Promise.reject('This is error message'), //this message will be returned if there's error
    });

    if (postsQuery.isLoading) {
        return <h2>Loading, please wait...</h2>;
    }
    if (postsQuery.isError) {
        return <pre>{JSON.stringify(postsQuery.error)}</pre>; //shows an error message if there's an error
    }

    return (
        <>
            <h1>Hello World</h1>
        </>
    );
};

const wait = (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration));
};

export default App;
