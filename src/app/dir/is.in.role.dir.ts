import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AppAuthService } from '../services/app.auth.service';

@Directive({ selector: '[appIsInRole]' })
export class IsInRoleDirective implements OnInit, OnDestroy {
  @Input() appIsInRole = '';
  private stop$ = new Subject<void>();
  private isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AppAuthService
  ) {}

  ngOnInit() {
    this.authService.authStatus$
      .pipe(
        takeUntil(this.stop$),
        switchMap(() => this.authService.getRoles())
      )
      .subscribe((roles) => {
        const hasRole = roles.includes(this.appIsInRole);

        if (hasRole && !this.isVisible) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
          this.isVisible = true;
        } else if (!hasRole && this.isVisible) {
          this.viewContainerRef.clear();
          this.isVisible = false;
        }
      });
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }
}
