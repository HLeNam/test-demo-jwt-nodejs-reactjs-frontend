import { useEffect, useState } from "react";
import "./Users.scss";
import { fetchAllUsers } from "../../services/userService";
import ReactPaginate from "react-paginate";

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit);

        if (response && response.data && response.data.EC === 0) {
            // setListUsers(response.data.DT);

            setTotalPages(response.data.DT.totalPages);

            setListUsers(response.data.DT.users);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        // await fetchUsers(+event.selected + 1);
    };

    return (
        <div className="container">
            <div className="manage-users-container">
                <div className="user-header">
                    <div className="title">
                        <h3>Table Users</h3>
                    </div>

                    <div className="actions">
                        <button className="btn btn-primary">Refresh</button>
                        <button className="btn btn-success">Add new User</button>
                    </div>
                </div>

                <div className="user-body">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group Role</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ? (
                                <>
                                    {listUsers.map((user, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.username}</td>
                                                <td>{user.Group ? user.Group.name : ""}</td>
                                                <td>
                                                    <button className="btn btn-warning">
                                                        Edit
                                                    </button>
                                                    <span className="mx-1"></span>
                                                    <button className="btn btn-danger">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <tr>
                                        <td>Not found users</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 0 && (
                    <div className="user-footer">
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
