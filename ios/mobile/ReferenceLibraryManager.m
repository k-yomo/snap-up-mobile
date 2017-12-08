//
//  ReferenceLibraryManager.m
//  mobile
//
//  Created by Kanij Yomoda on 2017-12-07.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "ReferenceLibraryManager.h"
#import <UIKit/UIReferenceLibraryViewController.h>
#import "AppDelegate.h"

@implementation ReferenceLibraryManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(showDefinitionForTerm:(NSString*)term callback:(RCTResponseSenderBlock)callback)
{
  if (callback == nil)
    return;
  
  BOOL hasDefinition = NO;
  if ([UIReferenceLibraryViewController dictionaryHasDefinitionForTerm:term])
  {
    hasDefinition = YES;
    
    dispatch_async(dispatch_get_main_queue(), ^{
      UIReferenceLibraryViewController *referenceLibraryVC = [[UIReferenceLibraryViewController alloc] initWithTerm:term];
      UIViewController *rootVC = ((AppDelegate*)[UIApplication sharedApplication].delegate).window.rootViewController;
      [rootVC presentViewController:referenceLibraryVC animated:YES completion:nil];
    });
  }
  
  callback(@[@(hasDefinition)]);
}

@end
