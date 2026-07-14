import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";

function History() {
  const [emails, setEmails] = useState([]);

  const fetchHistory = async () => {
    try {
      const { data } = await API.get("/email/history");
      setEmails(data.emails);
    } catch (error) {
      toast.error("Failed to load history");
    }
  };

  const deleteEmail = async (id) => {
    try {
      await API.delete(`/email/${id}`);

      toast.success("Email Deleted");

      setEmails(emails.filter((email) => email._id !== id));
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Toaster position="top-right" />

      <div className="container py-5">

        <h2 className="text-center fw-bold mb-4">
          📜 Email History
        </h2>

        {emails.length === 0 ? (
          <div className="alert alert-info text-center">
            No Emails Found
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email._id}
              className="card shadow-sm border-0 mb-4"
            >
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                  <div className="w-100 me-3">

                    <h5 className="fw-bold">
                      {email.subject}
                    </h5>

                    <p className="mb-3">
                      <strong>Tone:</strong> {email.tone}
                    </p>

                    <div
                      className="border rounded p-3 bg-light"
                      style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.8",
                        fontSize: "15px",
                        maxHeight: "300px",
                        overflowY: "auto",
                      }}
                    >
                      {email.generatedEmail}
                    </div>

                  </div>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteEmail(email._id)}
                    title="Delete Email"
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </>
  );
}

export default History;