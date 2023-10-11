"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { Landmark, Trash2 } from "lucide-react";
import { useTransition } from "react";
const PresetActions = ({
  id,
  dialogTitle,
  dialogMessage,
  PressActionButton,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const startTransition = useTransition();

  const handleDelete = async () => {
    try {
      // startTransition(() => {
      //   const response = UpdateJob();
      // });
      // toast({
      //   description: "This preset has been deleted.",
      // });
      setShowDeleteDialog(false);
    } catch (error) {}
  };

  return (
    <div className="flex-1">
      <Button onClick={() => setShowDeleteDialog(true)} variant="destructive">
        {/* <Trash2 /> */}
        <span className=""> {dialogTitle}</span>
      </Button>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              `This action cannot be undone. {dialogMessage}`
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDelete}>
              {PressActionButton}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PresetActions;
