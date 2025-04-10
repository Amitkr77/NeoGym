import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Mail, Send } from "lucide-react";

interface ContactSupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactSupportModal = ({ open, onOpenChange }: ContactSupportModalProps) => {
  const form = useForm({
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Support request sent:", data);
    alert("Support request sent successfully!");
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="What can we help you with?" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your issue in detail..."
                      rows={5}
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-neogym-red hover:bg-neogym-red/90">
                <Send className="h-4 w-4 mr-2" /> Send Message
              </Button>
            </DialogFooter>
          </form>
        </Form>

        <div className="mt-4 border-t pt-4 text-sm text-gray-500 flex items-center">
          <Mail className="h-4 w-4 mr-2 text-neogym-red" />
          Or email us directly at:{" "}
          <a
            href="mailto:support@neogym.com"
            className="text-neogym-red hover:underline ml-1"
          >
            support@neogym.com
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSupportModal;
