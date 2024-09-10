import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userId: number | null = this.getUserIdFromStorage();
  private userRole: string | null = this.getUserRoleFromStorage();
  private loggedIn = new BehaviorSubject<boolean>(this.getAuthStateFromStorage());
  private searchTermSubject = new BehaviorSubject<string>('');
  private filterParams = new BehaviorSubject<any>({
    precioMenor: 0,
    precioMayor: 1000,
    selectedCategory: 0,
    selectedBrand: 0
  });

  setFilterParams(params: any): void {
    this.filterParams.next(params);
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }
  
  getUserRole(): string | null {
    return this.userRole;
  }

  getFilterParams(): Observable<any> {
    return this.filterParams.asObservable();
  }

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  getSearchTerm(): BehaviorSubject<string> {
    return this.searchTermSubject;
  }

  setUserId(id: number) {
    this.userId = id;
    localStorage.setItem('userId', id.toString());
  }

  getUserId(): number | null {
    return this.userId;
  }

  private getUserIdFromStorage(): number | null {
    const storedId = localStorage.getItem('userId');
    return storedId ? parseInt(storedId, 10) : null;
  }

  private getUserRoleFromStorage(): string | null {
    const storedRole = localStorage.getItem('userRole');
    return storedRole ? storedRole : null;
  }

  setAuthenticated(isAuthenticated: boolean) {
    this.loggedIn.next(isAuthenticated);
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private getAuthStateFromStorage(): boolean {
    const storedState = localStorage.getItem('isAuthenticated');
    return storedState ? JSON.parse(storedState) : false;
  }
}