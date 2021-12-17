import React from 'react'

const EditModal = (props) => {
    return (
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">Update Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={props.func1}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="editTitle" className="form-label">Note Title</label>
                                <input type="text" className="form-control" id="editTitle" name="editTitle" placeholder="Enter Title" value={props.data.editTitle} onChange={props.func} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editDesc" className="form-label">Note Description</label>
                                <textarea className="form-control" id="editDesc" name="editDesc" placeholder="Enter Description" value={props.data.editDesc} rows="3" onChange={props.func} required></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update Note</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditModal;