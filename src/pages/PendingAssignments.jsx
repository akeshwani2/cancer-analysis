import React, { useState } from 'react'
import { IconFolder, IconPlus, IconArrowLeft, IconPencil, IconTrash, IconCheck, IconX, IconChevronRight, IconClock } from '@tabler/icons-react'

export default function AssignmentManager() {
  const [folders, setFolders] = useState([])
  const [currentFolder, setCurrentFolder] = useState(null)
  const [isAddingFolder, setIsAddingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [isAddingAssignment, setIsAddingAssignment] = useState(false)
  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', dueDate: '' })
  const [editingId, setEditingId] = useState(null)
  const [editingAssignment, setEditingAssignment] = useState({ title: '', course: '', dueDate: '' })

  const addFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = { id: Date.now().toString(), name: newFolderName, assignments: [] }
      setFolders([...folders, newFolder])
      setNewFolderName('')
      setIsAddingFolder(false)
      setCurrentFolder(newFolder)
    }
  }

  const editFolder = (id, newName) => {
    setFolders(folders.map(folder => 
      folder.id === id ? { ...folder, name: newName } : folder
    ))
  }

  const deleteFolder = (id) => {
    setFolders(folders.filter(folder => folder.id !== id))
    if (currentFolder && currentFolder.id === id) {
      setCurrentFolder(null)
    }
  }

  const addAssignment = () => {
    if (currentFolder && newAssignment.title.trim()) {
      const updatedFolder = {
        ...currentFolder,
        assignments: [...currentFolder.assignments, { ...newAssignment, id: Date.now().toString(), completed: false }]
      }
      setFolders(folders.map(folder => 
        folder.id === currentFolder.id ? updatedFolder : folder
      ))
      setCurrentFolder(updatedFolder)
      setNewAssignment({ title: '', course: '', dueDate: '' })
      setIsAddingAssignment(false)
    }
  }

  const toggleComplete = (assignmentId) => {
    if (currentFolder) {
      const updatedAssignments = currentFolder.assignments.map(assignment => 
        assignment.id === assignmentId ? { ...assignment, completed: !assignment.completed } : assignment
      )
      updateCurrentFolder(updatedAssignments)
    }
  }

  const deleteAssignment = (assignmentId) => {
    if (currentFolder) {
      const updatedAssignments = currentFolder.assignments.filter(assignment => assignment.id !== assignmentId)
      updateCurrentFolder(updatedAssignments)
    }
  }

  const startEditing = (assignment) => {
    setEditingId(assignment.id)
    setEditingAssignment({ ...assignment })
  }

  const saveEdit = () => {
    if (currentFolder) {
      const updatedAssignments = currentFolder.assignments.map(assignment => 
        assignment.id === editingId ? { ...editingAssignment } : assignment
      )
      updateCurrentFolder(updatedAssignments)
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingAssignment({ title: '', course: '', dueDate: '' })
  }

  const updateCurrentFolder = (updatedAssignments) => {
    const updatedFolder = { ...currentFolder, assignments: updatedAssignments }
    setFolders(folders.map(folder => 
      folder.id === currentFolder.id ? updatedFolder : folder
    ))
    setCurrentFolder(updatedFolder)
  }

  return (
    <div className="min-h-screen text-white p-8">
      {currentFolder ? (
        <div>
          <div className="flex items-center mb-6">
            <button onClick={() => setCurrentFolder(null)} className="mr-4 text-gray-400 hover:text-white">
              <IconArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold flex-grow">{currentFolder.name}</h1>
            <button onClick={() => startEditing({ id: currentFolder.id, title: currentFolder.name })} className="text-blue-500 hover:text-blue-400 p-1 mr-2">
              <IconPencil className="w-5 h-5" />
            </button>
            <button onClick={() => deleteFolder(currentFolder.id)} className="text-red-500 hover:text-red-400 p-1">
              <IconTrash className="w-5 h-5" />
            </button>
          </div>
          {editingId === currentFolder.id ? (
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={editingAssignment.title}
                onChange={(e) => setEditingAssignment({...editingAssignment, title: e.target.value})}
                className="bg-gray-700 text-white px-2 py-1 rounded mr-2"
                autoFocus
              />
              <button onClick={() => editFolder(currentFolder.id, editingAssignment.title)} className="text-green-500 hover:text-green-400 p-1 mr-2">
                <IconCheck className="w-5 h-5" />
              </button>
              <button onClick={cancelEdit} className="text-red-500 hover:text-red-400 p-1">
                <IconX className="w-5 h-5" />
              </button>
            </div>
          ) : null}
          <div className="grid gap-6 mb-6">
            {currentFolder.assignments.map((assignment) => (
              <div key={assignment.id} className={`bg-gray-800 rounded-lg p-6 flex justify-between items-center ${assignment.completed ? 'opacity-50' : ''}`}>
                <div className="flex items-center flex-grow">
                  <button
                    onClick={() => toggleComplete(assignment.id)}
                    className={`mr-4 p-1 rounded-full ${assignment.completed ? 'bg-green-500' : 'bg-gray-600'}`}
                    aria-label={assignment.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    <IconCheck className="w-5 h-5 text-white" />
                  </button>
                  {editingId === assignment.id ? (
                    <div className="flex-grow grid grid-cols-1 gap-2">
                      <input
                        type="text"
                        value={editingAssignment.title}
                        onChange={(e) => setEditingAssignment({...editingAssignment, title: e.target.value})}
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                        placeholder="Assignment title"
                      />
                      <input
                        type="text"
                        value={editingAssignment.course}
                        onChange={(e) => setEditingAssignment({...editingAssignment, course: e.target.value})}
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                        placeholder="Course"
                      />
                      <input
                        type="date"
                        value={editingAssignment.dueDate}
                        onChange={(e) => setEditingAssignment({...editingAssignment, dueDate: e.target.value})}
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className={`text-xl font-semibold ${assignment.completed ? 'line-through' : ''}`}>{assignment.title}</h2>
                      <p className="text-gray-400">{assignment.course}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  {editingId === assignment.id ? (
                    <>
                      <button onClick={saveEdit} className="text-green-500 hover:text-green-400 p-1 mr-2" aria-label="Save edit">
                        <IconCheck className="w-5 h-5" />
                      </button>
                      <button onClick={cancelEdit} className="text-red-500 hover:text-red-400 p-1" aria-label="Cancel edit">
                        <IconX className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <IconClock className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-green-400 mr-4">{assignment.dueDate}</span>
                      <button
                        onClick={() => startEditing(assignment)}
                        className="text-blue-500 hover:text-blue-400 p-1 mr-2"
                        aria-label="Edit assignment"
                      >
                        <IconPencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteAssignment(assignment.id)}
                        className="text-red-500 hover:text-red-400 p-1"
                        aria-label="Delete assignment"
                      >
                        <IconTrash className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isAddingAssignment ? (
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">Add New Assignment</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-400">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-400">Course</label>
                  <input
                    type="text"
                    id="course"
                    value={newAssignment.course}
                    onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-400">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsAddingAssignment(false)}
                    className="mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addAssignment}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add Assignment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setIsAddingAssignment(true)}
            >
              <IconPlus className="w-5 h-5 mr-2" />
              Add New Assignment
            </button>
          )}
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-8">Folders</h1>
          <div className="grid gap-6 mb-6">
            {folders.map((folder) => (
              <div key={folder.id} className="bg-gray-800 rounded-lg p-6 flex justify-between items-center">
                <button
                  className="flex items-center text-xl font-semibold"
                  onClick={() => setCurrentFolder(folder)}
                >
                  <IconFolder className="w-6 h-6 mr-2" />
                  {folder.name}
                </button>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-4">{folder.assignments.length} assignments</span>
                  <IconChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
          {isAddingFolder ? (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Add New Folder</h2>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="flex-grow bg-gray-700 text-white px-2 py-1 rounded mr-2"
                  placeholder="Folder name"
                />
                <button onClick={addFolder} className="text-green-500 hover:text-green-400 p-1 mr-2">
                  <IconCheck className="w-5 h-5" />
                </button>
                <button onClick={() => setIsAddingFolder(false)} className="text-red-500 hover:text-red-400 p-1">
                  <IconX className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setIsAddingFolder(true)}
            >
              <IconPlus className="w-5 h-5 mr-2" />
              Add New Folder
            </button>
          )}
        </div>
      )}
    </div>
  )
}