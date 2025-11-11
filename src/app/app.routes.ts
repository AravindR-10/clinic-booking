import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin-guard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
    { path: 'signup', loadComponent: () => import('./pages/signup/signup').then(m => m.Signup) },
    { path: 'admin-dashboard', loadComponent: () => import('./pages/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard), canActivate: [AdminGuard] },
    { path: 'user-dashboard', loadComponent: () => import('./pages/user-dashboard/user-dashboard').then(m => m.UserDashboard), canActivate: [AuthGuard] },
    { path: 'add-doctor', loadComponent: () => import('./pages/add-doctor/add-doctor').then(m => m.AddDoctor), canActivate: [AdminGuard] },
    { path: 'edit-doctor/:id', loadComponent: () => import('./pages/edit-doctor/edit-doctor').then(m => m.EditDoctor), canActivate: [AdminGuard] },
    { path: 'book-appointment/:doctorId', loadComponent: () => import('./pages/book-appointment/book-appointment').then(m => m.BookAppointment), canActivate: [AuthGuard] },
    { path: 'view-bookings', loadComponent: () => import('./pages/view-bookings/view-bookings').then(m => m.ViewBookings), canActivate: [AdminGuard] }
];
