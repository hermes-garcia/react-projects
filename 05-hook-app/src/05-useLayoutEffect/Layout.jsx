import {useFetch, useCounter} from '../hooks';
import {LoadingQuote, Quote} from '../03-examples';

export const Layout = () => {

    const {counter, increment} = useCounter(1);
    const {data, isLoading, hasError} = useFetch(`https://api.breakingbadquotes.xyz/v1/quotes?${counter}`);

    const {quote, author} = !!data && data[0];

    return (
        <>
            <h1>BreakingBad Quotes</h1>
            <hr/>
            {
                isLoading ? <LoadingQuote /> : <Quote quote={quote} author={author} />
            }
            <button className="btn btn-outline-dark"
                    disabled={isLoading}
                    onClick={() => increment()}>Next quote</button>
        </>
    );
};