import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { db } from './firebase'
import { Project, Experience, Skill, Category } from '@/types/portfolio'

export const getProjects = async (): Promise<Project[]> => {
  try {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Project))
      .filter(project => project.featured)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export const getExperience = async (): Promise<Experience[]> => {
  try {
    const q = query(collection(db, 'experience'), orderBy('order', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Experience))
  } catch (error) {
    console.error('Error fetching experience:', error)
    return []
  }
}

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const q = query(collection(db, 'skills'), orderBy('order', 'asc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Skill))
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const q = query(collection(db, 'categories'), orderBy('order', 'asc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}