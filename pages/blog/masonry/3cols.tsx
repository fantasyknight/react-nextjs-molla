import { useQuery } from '@apollo/client';

import ALink from '~/components/features/Alink';
import PageHeader from '~/components/features/PageHeader';
import PostOne from '~/components/features/posts/PostOne';

import { GET_POSTS_BY_PAGE } from '~/server/queries';
import { Post } from '~/utils/types';

const BlogMasonry3Cols = () => {
    const { data, loading, error } = useQuery(GET_POSTS_BY_PAGE, {
        variables: { page: 'masonry-3' },
    });
    const posts: Post[] = data && data.postsByPage.data;

    const getPostCategory = (post: Post) => {
        return post.blog_categories.reduce((acc, cur) => {
            return acc + ' ' + cur.slug;
        }, '');
    };

    if (error) {
        return <div></div>;
    }

    return (
        <div className="main">
            <PageHeader title="Blog Masonry 3 Columns" subTitle="Blog" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/blog/classic">Blog</ALink>
                        </li>
                        <li className="breadcrumb-item active">
                            Masonry 3 Columns
                        </li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div
                    className={`container skeleton-body ${
                        loading ? '' : 'loaded'
                    }`}
                >
                    {loading || !posts ? (
                        <div className="row">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div className="col-sm-6 col-md-4" key={item}>
                                    <div className="skel-grid-post"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <nav className="blog-nav">
                                <ul className="menu-cat entry-filter justify-content-center">
                                    <li className="active">
                                        <ALink href="/blog/listing">
                                            All Blog Posts
                                            <span>6</span>
                                        </ALink>
                                    </li>
                                    <li>
                                        <ALink href="/blog/listing?category=lifestyle">
                                            Lifestyle
                                            <span>3</span>
                                        </ALink>
                                    </li>
                                    <li>
                                        <ALink href="/blog/listing?category=shopping">
                                            Shopping
                                            <span>1</span>
                                        </ALink>
                                    </li>
                                    <li>
                                        <ALink href="/blog/listing?category=travel">
                                            Travel
                                            <span>2</span>
                                        </ALink>
                                    </li>
                                    <li>
                                        <ALink href="/blog/listing?category=hobbies">
                                            Hobbies
                                            <span>2</span>
                                        </ALink>
                                    </li>
                                    <li>
                                        <ALink href="/blog/listing?category=fashion">
                                            Fashion
                                            <span>1</span>
                                        </ALink>
                                    </li>
                                </ul>
                            </nav>
                            {posts.length == 0 ? (
                                <div className="row">
                                    <p className="blogs-info">
                                        No posts were found matching your
                                        selection.
                                    </p>
                                </div>
                            ) : (
                                <div className="row">
                                    {posts.map((post, index) => (
                                        <div
                                            className={`col-sm-6 col-md-4 grid-item${getPostCategory(
                                                post
                                            )}`}
                                            key={index}
                                        >
                                            <PostOne
                                                post={post}
                                                adClass="text-center"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogMasonry3Cols;
