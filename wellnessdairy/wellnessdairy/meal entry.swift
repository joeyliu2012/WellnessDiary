//
//  meal entry.swift
//  wellnessdairy
//
//  Created by yujia liu on 15/10/18.
//  Copyright © 2015年 yujia liu. All rights reserved.
//

import UIKit
import Parse
import Bolts

class meal_entry: UIViewController {

    @IBOutlet weak var car: UITextField!
    
    @IBOutlet weak var cal: UITextField!
    
    
    @IBOutlet weak var sugar: UITextField!
    let testObject = PFObject(className: "TestObject")
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    @IBAction func submit(sender: AnyObject) {
        
        testObject["carb"] = car.text
        testObject["cal"] = cal.text
        testObject["sugar"] = sugar.text
        testObject.saveInBackgroundWithBlock { (success: Bool, error: NSError?) -> Void in
            print("Object has been saved.")
        }
    }

}
