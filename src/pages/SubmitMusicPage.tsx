import React, { useState } from "react";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const SubmitMusicPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Video submitted successfully! We will review it shortly.");
    }, 2000);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-10 text-white">
            <h1 className="text-3xl font-bold mb-2">Face TV Video Submission Form</h1>
            <p className="text-red-100">
              Please fill in all details below and submit the completed form with the video and lyrics.
            </p>
          </div>

          <div className="p-8">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-8 text-sm text-red-800 dark:text-red-200">
              <p className="font-semibold mb-1">NOTE:</p>
              <p>NO VIDEOS WILL BE CONSIDERED FOR ACQUISITION OR PLAYLIST MEETINGS WITHOUT A FULLY COMPLETED SUBMISSION FORM AND ACCOMPANYING LYRICS. IF ACCEPTED, THIS MUSIC VIDEO'S ON-SCREEN CLIP TITLE WILL APPEAR AS ENTERED ON THIS FORM INCLUDING CAPITALISATION, ABBREVIATIONS AND PUNCTUATION. PLEASE ENSURE YOUR INFORMATION IS ENTERED ACCURATELY!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Media Formats & Files */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">Media Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="format">Format delivered to Face TV</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2k">2k (high definition)</SelectItem>
                        <SelectItem value="16:9">16:9 HD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="original">Original Full Version</SelectItem>
                        <SelectItem value="clean">Clean</SelectItem>
                        <SelectItem value="dirty">Dirty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Upload Video File
                    </Label>
                    <Input id="video-upload" type="file" accept="video/*" required className="cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lyrics-upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Upload Lyrics (PDF/DOC)
                    </Label>
                    <Input id="lyrics-upload" type="file" accept=".pdf,.doc,.docx" required className="cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Track Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">Track Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="artistName">Name of Artist(s) *</Label>
                    <Input id="artistName" required placeholder="e.g. John Doe ft. Jane" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trackTitle">Track Title *</Label>
                    <Input id="trackTitle" required placeholder="Track Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="albumTitle">Album Title</Label>
                    <Input id="albumTitle" placeholder="Album Name (if applicable)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videoDirector">Video Director(s)</Label>
                    <Input id="videoDirector" placeholder="Director Name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Video Length *</Label>
                    <div className="flex gap-4">
                      <div className="flex-1 flex items-center gap-2">
                        <Input type="number" min="0" placeholder="00" required className="w-full" />
                        <span className="text-sm text-gray-500">Min</span>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <Input type="number" min="0" max="59" placeholder="00" required className="w-full" />
                        <span className="text-sm text-gray-500">Sec</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recordLabel">Record Label/Artist *</Label>
                    <Input id="recordLabel" required placeholder="Label Name" />
                    <p className="text-xs text-gray-500">Licensed by UPRS</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="writers">Writer(s) (Full Names)</Label>
                    <Input id="writers" placeholder="Writers" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publishers">Publisher(s)</Label>
                    <Input id="publishers" placeholder="Publishers" />
                  </div>
                </div>
              </div>

              {/* Release & Origin */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">Release & Origin</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="digitalRelease">Digital Release Date</Label>
                    <Input id="digitalRelease" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="physicalRelease">Physical Release Date</Label>
                    <Input id="physicalRelease" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="albumRelease">Album Release Date</Label>
                    <Input id="albumRelease" type="date" />
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="artistCountry">Country of Origin of Artist</Label>
                    <Input id="artistCountry" placeholder="Country" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="producedCountry">Country in which Video Produced *</Label>
                    <Input id="producedCountry" required placeholder="Country of production company" />
                  </div>
                </div>
              </div>

              {/* Authorised Representative */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">Authorised Representative</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="printName">Print Name (BLOCK CAPITALS) *</Label>
                    <Input id="printName" required placeholder="YOUR NAME" className="uppercase" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input id="position" required placeholder="e.g. Director, Artist Manager" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repLabel">Record Label/Artist *</Label>
                    <Input id="repLabel" required placeholder="Label/Artist" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" required type="tel" placeholder="+256..." />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" required type="email" placeholder="email@example.com" />
                  </div>
                </div>
              </div>

              {/* Terms & Submit */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border dark:border-gray-800 space-y-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-4">
                  <p>
                    <strong>TERMS OF SUBMISSION:</strong> This Video is hereby given to Face TV and its affiliates for exhibition on Face TV and other channels owned, operated and/or licensed by UPRS, on All Media Platforms, In Perpetuity, WORLDWIDE unless you specify a limited territory.
                  </p>
                  <p>
                    Face TV will make minor edits to videos and add informational signs containing age rating where required in order to comply with any applicable laws or broadcast regulations by <strong>UCC (Uganda Communications Commission)</strong>.
                  </p>
                  <p>
                    This form is governed by the law of Uganda and the parties hereby submit to the exclusive jurisdiction of the Uganda Courts, UPRS and UCC at large.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3 pt-4 border-t dark:border-gray-800">
                  <Checkbox 
                    id="terms" 
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      I agree to the terms and conditions and confirm that I am the Copyright Owner of the Music Video Master ("Record Label/Artist") or their Authorised Representative.
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-red-600 hover:bg-red-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Video & Form"}
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  Or scan this completed form with attached lyrics and email <a href="mailto:facetvuganda2@gmail.com" className="text-red-600 hover:underline">facetvuganda2@gmail.com</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitMusicPage;
