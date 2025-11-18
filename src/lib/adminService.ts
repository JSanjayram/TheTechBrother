import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy } from 'firebase/firestore'
import { db } from './firebase'
import { Project, Experience, Skill, Category } from '@/types/portfolio'

// Add new project
export const addProject = async (project: Omit<Project, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'projects'), project)
  return docRef.id
}

// Update project
export const updateProject = async (id: string, project: Partial<Project>): Promise<void> => {
  await updateDoc(doc(db, 'projects', id), project)
}

// Delete project
export const deleteProject = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'projects', id))
}

// Add experience
export const addExperience = async (experience: Omit<Experience, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'experience'), experience)
  return docRef.id
}

// Update experience
export const updateExperience = async (id: string, experience: Partial<Experience>): Promise<void> => {
  await updateDoc(doc(db, 'experience', id), experience)
}

// Delete experience
export const deleteExperience = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'experience', id))
}

// Add skill
export const addSkill = async (skill: Omit<Skill, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'skills'), skill)
  return docRef.id
}

// Update skill
export const updateSkill = async (id: string, skill: Partial<Skill>): Promise<void> => {
  await updateDoc(doc(db, 'skills', id), skill)
}

// Delete skill
export const deleteSkill = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'skills', id))
}

// Get all data for admin
export const getAllProjects = async (): Promise<Project[]> => {
  const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project))
}

export const getAllExperience = async (): Promise<Experience[]> => {
  const q = query(collection(db, 'experience'), orderBy('order', 'desc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experience))
}

// Category functions
export const addCategory = async (category: Omit<Category, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'categories'), category)
  return docRef.id
}

export const getAllCategories = async (): Promise<Category[]> => {
  const q = query(collection(db, 'categories'), orderBy('order', 'asc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category))
}

export const updateCategory = async (id: string, category: Partial<Category>): Promise<void> => {
  await updateDoc(doc(db, 'categories', id), category)
}

export const deleteCategory = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'categories', id))
}

export const getAllSkills = async (): Promise<Skill[]> => {
  const q = query(collection(db, 'skills'), orderBy('order', 'asc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill))
}

// Get single project by ID
export const getProjectById = async (id: string): Promise<Project | null> => {
  const docRef = doc(db, 'projects', id)
  const docSnap = await getDoc(docRef)
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Project
  } else {
    return null
  }
}