import { useState, useEffect } from "react";
// import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

function Demo() {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });
    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState("");
      // RTK lazy query
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
     // Load data from localStorage on mount
    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem("articles")
        );
        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage);
        }
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();    
        const existingArticle = allArticles.find(
          (item) => item.url === article.url
        );
    
        if (existingArticle) return setArticle(existingArticle);
    
        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.summary) {
          const newArticle = { ...article, summary: data.summary };
          const updatedAllArticles = [newArticle, ...allArticles];
          // update state and local storage
          setArticle(newArticle);
          setAllArticles(updatedAllArticles);
          localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        }
    };
    // copy the url and toggle the icon for user feedback
    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
        handleSubmit(e);
        }
    };
    return (
        <section className='mt-16 w-full max-w-xl'>
            {/* Search */}
            <div className='flex flex-col w-full gap-2'>
                <form
                className='relative flex justify-center items-center'
                onSubmit={handleSubmit}
                >
                <img
                    src='data:image/jpeg;base64,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'
                    alt='link-icon'
                    className='absolute left-0 my-2 ml-3 w-5'
                />

                <input
                    type='url'
                    placeholder='Paste the article link'
                    value={article.url}
                    onChange={(e) => setArticle({ ...article, url: e.target.value })}
                    onKeyDown={handleKeyDown}
                    required
                    className='url_input peer' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
                />
                <button
                    type='submit'
                    className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
                >
                    <p>▶</p>
                </button>
                </form>

                {/* Browse History */}
                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                {allArticles.reverse().map((item, index) => (
                    <div
                    key={`link-${index}`}
                    onClick={() => setArticle(item)}
                    className='link_card'
                    >
                    <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                        <img
                        src={copied === item.url ? 'https://th.bing.com/th?id=OIP.GxSdgZx4VkM4ZHcxx6JwrwHaGb&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' : 'data:image/jpeg;base64,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'}
                        alt={copied === item.url ? "tick_icon" : "copy_icon"}
                        className='w-[40%] h-[40%] object-contain'
                        />
                    </div>
                    <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                        {item.url}
                    </p>
                    </div>
                ))}
                </div>
            </div>

            {/* Display Result */}
            <div className='my-10 max-w-full flex justify-center items-center'>
                {isFetching ? (
                <img src='https://cdn.dribbble.com/users/1144/screenshots/1947331/loader-animation.gif' alt='loader' className='w-20 h-20 object-contain' />
                ) : error ? (
                <p className='font-inter font-bold text-black text-center'>
                    Well, that wast supposed to happen...
                    <br />
                    <span className='font-satoshi font-normal text-gray-700'>
                    {error?.data?.error}
                    </span>
                </p>
                ) : (
                article.summary && (
                    <div className='flex flex-col gap-3'>
                    <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                        Article <span className='blue_gradient'>Summary</span>
                    </h2>
                    <div className='summary_box'>
                        <p className='font-inter font-medium text-sm text-gray-700'>
                        {article.summary}
                        </p>
                    </div>
                    </div>
                )
                )}
            </div>
        </section>
    )
}

export default Demo