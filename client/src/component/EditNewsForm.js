// import React from 'react'

// const
//  = () => {
//   return (
//    <form onSubmit={updateNews}>
//    <input
//      type="file"
//      id="file"
//      hidden
//      onChange={(e) => setFile(e.target.files[0])}
//    />
//    <div className="form-group mb-3">
//      <label htmlFor="title">Title</label>
//      <input
//        type="text"
//        className="form-control"
//        placeholder="title"
//        id="title"
//        value={title}
//        onChange={(e) => setTitle(e.target.value)}
//        required
//      />
//    </div>
//    <div className="form-group mb-3">
//      <label htmlFor="headline">Headline</label>
//      <input
//        type="text"
//        className="form-control"
//        placeholder="headline"
//        id="headline"
//        value={headline}
//        onChange={(e) => setHeadline(e.target.value)}
//        required
//      />
//    </div>
//    <div className="form-group mb-3">
//      <label htmlFor="description">Full Details</label>
//      <textarea
//        cols="30"
//        rows="10"
//        className="form-control"
//        id="description"
//        value={details}
//        onChange={(e) => setDetails(e.target.value)}
//      ></textarea>
//    </div>
//    <div className="form-group mb-2">
//      <select
//        className="form-select form-select-sm"
//        aria-label=".form-select-sm example"
//        value={newsCat}
//        onChange={(e) => setNewsCat(e.target.value)}
//      >
//        <option defaultValue={true}>Choose Category</option>
//        {category.map((item) => (
//          <option value={item.title} key={item.categoryid}>
//            {item.title}
//          </option>
//        ))}
//      </select>
//    </div>
//    <div className="form-group my-3">
//      {error && <small className="text-danger">{error}</small>}
//      {loading ? (
//        <>
//          <h5 className="text-info">Just a minute... Publishing News</h5>
//          <button
//            className="btn btn-sm btn-outline-primary"
//            disabled
//            style={{ cursor: "progress", opacity: "0.4" }}
//          >
//            <i className="bi bi-send"></i>
//            Updating
//          </button>
//        </>
//      ) : (
//        <button className="btn btn-sm btn-outline-primary">
//          <i className="bi bi-send"></i>
//          Update
//        </button>
//      )}
//    </div>
//  </form>
//   )
// }

// export default
