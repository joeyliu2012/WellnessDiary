//
//  ViewController.swift
//  wellnessdairy
//
//  Created by yujia liu on 15/10/18.
//  Copyright © 2015年 yujia liu. All rights reserved.
//

import UIKit
import Parse

class ViewController: UIViewController {

    @IBOutlet weak var username: UITextField!
    @IBOutlet weak var passward: UITextField!
    
    let testObject = PFObject(className: "TestObject")

    override func viewDidLoad() {
        super.viewDidLoad()
            // Do any additional setup after loading the view, typically from a nib.
        }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func sender(sender: AnyObject) {

        testObject["foo"] = "hahah"
        testObject["username"] = username.text
        testObject["password"] = passward.text
        testObject.saveInBackgroundWithBlock { (success: Bool, error: NSError?) -> Void in
            print("Object has been saved.")
        }

        
    }

    @IBAction func homepage(sender: AnyObject) {
        
    }
}

