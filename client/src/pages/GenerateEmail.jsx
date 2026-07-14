import { useState } from "react";
import { FaRobot, FaCopy, FaCheck } from "react-icons/fa";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";

function GenerateEmail() {
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("Professional");
  const [prompt, setPrompt] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!subject || !prompt) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const { data } = await API.post("/email/generate", {
        subject,
        tone,
        prompt,
      });

      setGeneratedEmail(data.email.generatedEmail);
      setCopied(false);

      toast.success("Email Generated Successfully 🎉");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);

      setCopied(true);

      toast.success("Copied to Clipboard");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Copy Failed");
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="container py-5">
        <div className="card shadow-lg border-0">
          <div className="card-body">

            <h2 className="text-center mb-4 fw-bold">
              🤖 AI Email Generator
            </h2>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Subject
              </label>

              <input
                className="form-control"
                placeholder="Enter Email Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Tone
              </label>

              <select
                className="form-select"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Formal</option>
                <option>Casual</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Prompt
              </label>

              <textarea
                rows="6"
                className="form-control"
                placeholder="Describe your email..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleGenerate}
              disabled={loading}
            >
              <FaRobot className="me-2" />

              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Generating...
                </>
              ) : (
                "Generate Email"
              )}
            </button>

            {generatedEmail && (
              <div className="mt-5">

                <h4 className="fw-bold text-primary mb-3">
                  📧 Generated Email
                </h4>

                <textarea
                  rows="10"
                  className="form-control"
                  value={generatedEmail}
                  readOnly
                />

                <button
                  className={`btn mt-3 ${
                    copied ? "btn-secondary" : "btn-success"
                  }`}
                  onClick={copyEmail}
                  disabled={copied}
                >
                  {copied ? (
                    <>
                      <FaCheck className="me-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <FaCopy className="me-2" />
                      Copy Email
                    </>
                  )}
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default GenerateEmail;