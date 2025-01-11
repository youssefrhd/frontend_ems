import { Component, Input, OnInit, signal } from '@angular/core';
import { Router } from 'express';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class NavbarComponent implements OnInit {
  isLoginPage: boolean = false; 
  private routerSubscription: Subscription;

  constructor(private router :Router){}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is '/login'
        this.isLoginPage = event.urlAfterRedirects === '/login';
      }
    });
  }

  
  
}
