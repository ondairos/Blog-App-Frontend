const BlogSubmitForm = (
    {
        addBlog,
        title,
        author,
        url,
        handleTitleChange,
        handleAuthorChange,
        handleUrlChange
    }
) => (
    <>
      <p>Add new blog post:</p>
      <form onSubmit={addBlog}>
        <label>Title:</label>
        <input value={title} onChange={handleTitleChange}>
        </input>
        <label>Author:</label>
        <input value={author} onChange={handleAuthorChange}>
        </input>
        <label>Url:</label>
        <input value={url} onChange={handleUrlChange}>
        </input>
        <button type='submit'>Save</button>
      </form>
    </>
  )

  export default BlogSubmitForm