import { useStudent } from './hooks/useStudent';
import { useGraduate } from './hooks/useGraduate';
import { useState } from 'react';

function App() {
  const studentsService = useStudent();
  const graduatesService = useGraduate();
  const [showForm, setShowForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    middleName: '',
    lastName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  await studentsService.createStudent(newStudent);
  setNewStudent({ firstName: '', middleName: '', lastName: '' });
  setShowForm(false);
};

  function zeroPad(num, length = 3) {
    return String(num).padStart(length, '0');
  }

  return (
    <div className="flex p-2 gap-2">
      <div className="flex-1 p-4 border-2 border-solid border-slate-100">
        <button
          className="py-1 px-4 rounded text-white bg-rose-500"
          onClick={studentsService.getAllStudents}>
          Load Students
        </button>

        <button
          className="ml-4 py-1 px-4 rounded text-white bg-rose-500"
          onClick={studentsService.getAllStudentsWithGraduateInfo}>
          Load Students with Graduation
        </button>

        <button
          className="ml-4 py-1 px-4 rounded text-white bg-rose-500"
          onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create Student'}
        </button>
        {/* Student Creation Form */}
        {showForm && (
          <div className="mt-4 p-4 border border-gray-300 rounded">
            <h3 className="font-bold mb-2">Create New Student</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={newStudent.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Middle Name:
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={newStudent.middleName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={newStudent.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="ml-4 py-1 px-4 rounded text-white bg-rose-500"
                >
                  Save Student
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="ml-4 py-1 px-4 rounded text-white bg-rose-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-6">
          {studentsService.students.map(student => (
            <div key={student.id} className="mb-2">
              <div>
                <span className="font-bold">id: </span>
                {student.id}
              </div>
              <div>
                <span className="font-bold">name: </span>
                {student.lastName}, {student.firstName} {student.middleName}
              </div>
              {/* Displays graduates info*/}
              {student.graduates && (
                <div className="ml-4">
                  {student.graduates.map(graduate => (
                    <div key={graduate.id}>
                      <div>
                        <span className="font-bold">Graduate id: </span>
                        {graduate.id}
                      </div>
                      <div>
                        <span className="font-bold">rog: </span>
                        {zeroPad(graduate.rogNo)}
                      </div>
                      {graduate.programs && graduate.programs.map( program =>(
                        <div key={program.id}>
                          <div>
                            <span className='font-bold'>
                              Program Code:
                            </span>
                            {program.code}  
                          </div>
                          <div>
                            <span className='font-bold'>
                              Program Name:
                            </span>
                            {program.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 border-2 border-solid border-slate-100">
        <button
          className="py-1 px-4 rounded text-white bg-rose-500"
          onClick={graduatesService.getAllGraduates}>
          Load Graduates
        </button>

        <button
          className="ml-4 py-1 px-4 rounded text-white bg-rose-500"
          onClick={graduatesService.getAllGraduatesWithStudentInfo}>
          Load Graduates with Student Info
        </button>

        <div className="mt-6">
          {graduatesService.graduates.map(graduate => (
            <div key={graduate.id} className="mb-2">
              <div>
                <span className="font-bold">id: </span>
                {graduate.id}
              </div>
              <div>
                <span className="font-bold">rog: </span>
                {zeroPad(graduate.rogNo)}
              </div>

              {/* Displays student info if student info is loaded */}
              {graduate.student && (
                <div className="ml-4">
                  <div>
                    <span className="font-bold">student id: </span>
                    {graduate.student.id}
                  </div>
                  <div>
                    <span className="font-bold">student name: </span>
                    {graduate.student.lastName}, {graduate.student.firstName} {graduate.student.middleName}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
