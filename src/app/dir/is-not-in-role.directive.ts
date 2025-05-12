import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppAuthService } from '../services/app.auth.service';

@Directive({ selector: '[appIsNotInRole]' })
export class IsNotInRoleDirective implements OnInit, OnDestroy {
  @Input() appIsNotInRole = '';
  private stop$ = new Subject<void>();
  private isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AppAuthService
  ) {}

  ngOnInit() {
    this.authService
      .getRoles()
      .pipe(takeUntil(this.stop$))
      .subscribe((roles) => {
        if (!roles || roles.includes(this.appIsNotInRole)) {
          this.isVisible = false;
          this.viewContainerRef.clear();
        } else {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        }
      });
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }
}
