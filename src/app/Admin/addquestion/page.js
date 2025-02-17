"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Navbar from "../components/Navbar";
import { supabase } from "../../util/supabase/client";

const AdminPage = () => {
  const router = useRouter(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer:""
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; 
    setIsSubmitting(true);

    const { category, question, option1, option2, option3, option4, answer } = formData;

    if (!category || !question || !option1 || !option2 || !option3 || !option4 ||!answer) {
      alert("Please fill in all fields!");
      setIsSubmitting(false);
      return;
    }

    const tableName =category === "Geography" ? "geographical"
                    : category === "Technical" ? "technical"
                    : "scientifical";

                    console.log("Inserting into table:", tableName);
console.log("Form data:", formData);


    const { error } = await supabase.from(tableName).insert([
      { question, option1, option2, option3, option4,answer },
    ]);

    if (error) {
      console.log("Error adding question:", error.message);
      alert("Failed to add question. Try again.");
    } else {
      alert("Question added successfully!");

      if (category === "Geography") {
        router.push("/Admin/geography");
      } else if (category === "Technical") {
        router.push("/Admin/technical");
      } else {
        router.push("/Admin/scientific");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="container align-items-center" style={{ marginTop: "150px", marginLeft: "150px" }}  >
          <div className="card p-4 border border-primary shadow-lg d-flex flex-column" style={{ width: 900, height: 500, borderRadius: 12 }}>
            <form className="fs-4 p-3" onSubmit={handleSubmit}>

              <table>
                <tbody>
                  <tr className="mb-4">
                    <td><label htmlFor="category">Category:</label></td>
                    <td><select name="category" value={formData.category} onChange={handleChange} style={{ width: "400px", height: "40px" }}>
                        <option value="">Select Category</option>
                        <option value="geographical">geographical</option>
                        <option value="technical">technical</option>
                        <option value="scientifical">scientifical</option>
                      </select></td>
                  </tr>
                  <tr className="mb-4">
                    <td><label htmlFor="question">Question :</label></td>
                    <td><input placeholder="Enter question" type="text" name="question"  style={{ width: 400, height: 40 }}
                     value={formData.question}onChange={handleChange}/></td>
                  </tr>
                  <tr className="mb-4">
                    <td><label htmlFor="options">Options :</label></td>
                    <td><input type="text" name="option1" placeholder="Option 1" style={{width: "400px",height: "40px",marginBottom: "10px", }}
                        value={formData.option1}  onChange={handleChange}/><br />

                      <input type="text" name="option2" placeholder="Option 2" style={{width: "400px",height: "40px",marginBottom: "10px",}}
                           value={formData.option2} onChange={handleChange} /> <br />

                      <input type="text" name="option3" placeholder="Option 3" value={formData.option3} onChange={handleChange}
                        style={{ width: "400px",height: "40px",marginBottom: "10px",}}/> <br />
                        
                      <input type="text" name="option4" placeholder="Option 4"value={formData.option4} onChange={handleChange}
                        style={{ width: "400px",height: "40px",marginBottom: "10px",}}/><br /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="answer">Answer :</label></td>
                    <td><input type="text" name="answer" placeholder="Enter answer" style={{width: "400px",height: "40px",marginBottom: "10px",}}
                    value={formData.answer} onChange={handleChange}/></td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-5 d-flex justify-content-center">
                <button type="submit" className="btn bg-primary btn-outline-secondary text-white fw-bold" style={{ width: "250px" }}>Add Question </button>
              </div>
            </form>
          </div></div>
      </div>
    </>
  );
};

export default AdminPage;
