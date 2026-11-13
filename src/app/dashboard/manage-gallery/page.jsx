
// "use client";

// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { auth, db } from "@/firebaseConfig";
// import {
//   collection,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   query,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import imageCompression from "browser-image-compression";

// /* ================= THEME COLORS (Light Mode) ================= */
// const Theme = {
//   PageBg: "#FAF8F4",        // Soft warm ivory/cream background
//   SurfaceBg: "#FFFFFF",     // Pure white for card sections
//   SurfaceAlt: "#F2EDE4",    // Light cream for inputs/cards
//   PrimaryGreen: "#11382b",  // Deep forest green primary color
//   GoldAccent: "#B28A2E",    // Muted warm gold accent
//   TextDark: "#1E293B",      // Main dark text
//   TextMuted: "#64748B",     // Secondary text
//   BorderColor: "#E2D9CE",   // Warm border tone
//   DangerColor: "#C53030",   // Refined red for delete buttons
// };

// const galleryCategories = [
//   { id: "properties", tag: "PROPERTIES", title: "Properties Gallery", subtitle: "Bold property imagery for the Properties page." },
//   { id: "bedroom", tag: "BEDROOM", title: "Bedroom", subtitle: "Interior collection — Bedroom" },
//   { id: "living-room", tag: "LIVING ROOM", title: "Living Room", subtitle: "Interior collection — Living Room" },
//   { id: "wall-decor", tag: "WALL DÉCOR", title: "Wall Decor", subtitle: "Interior collection — Wall Decor" },
//   { id: "dining-sets", tag: "DINING SETS", title: "Dining Sets", subtitle: "Interior collection — Dining Sets" },
//   { id: "hallway", tag: "HALLWAY", title: "Hallway", subtitle: "Interior collection — Hallway" },
//   { id: "tv-units", tag: "TV UNITS", title: "TV Units", subtitle: "Interior collection — TV Units" },
//   { id: "centre-pieces", tag: "CENTRE PIECES", title: "Centre Pieces", subtitle: "Interior collection — Centre Pieces" },
//   { id: "mirrors", tag: "MIRRORS", title: "Mirrors", subtitle: "Interior collection — Mirrors" },
//   { id: "flowers-vases", tag: "FLOWERS AND FLOWER VASE", title: "Flowers and flower vase", subtitle: "Interior collection — Flowers and Flower vase" },
//   { id: "kitchen", tag: "KITCHEN", title: "Kitchen", subtitle: "Interior collection — Kitchen" },
//   { id: "chairs", tag: "CHAIRS", title: "Chairs", subtitle: "Interior collection — Chairs" },
// ];

// const Container = styled.div`
//   background-color: ${Theme.PageBg};
//   min-height: 100vh;
//   padding: 3rem 1.5rem 5rem;
//   color: ${Theme.TextDark};
//   position: relative;
// `;

// const ContentWrapper = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const Title = styled.h1`
//   font-size: 2.2rem;
//   font-weight: 700;
//   color: ${Theme.PrimaryGreen};
//   font-family: serif;
// `;

// const SubtitleText = styled.p`
//   color: ${Theme.TextMuted};
//   font-size: 0.95rem;
//   margin-top: 0.5rem;
// `;

// const PlusButton = styled.button`
//   padding: 10px 22px;
//   margin-top: 20px;
//   border-radius: 6px;
//   font-size: 0.85rem;
//   font-weight: 700;
//   letter-spacing: 0.05em;
//   text-transform: uppercase;
//   background: ${Theme.PrimaryGreen};
//   color: ${Theme.SurfaceBg};
//   border: none;
//   box-shadow: 0 4px 12px rgba(17, 56, 43, 0.15);
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     background: ${Theme.GoldAccent};
//     color: ${Theme.PrimaryGreen};
//   }
// `;

// const CategorySection = styled.div`
//   margin-top: 2.5rem;
//   background: ${Theme.SurfaceBg};
//   padding: 1.75rem;
//   border-radius: 10px;
//   border: 1px solid ${Theme.BorderColor};
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
// `;

// const CategoryHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: baseline;
//   border-bottom: 1px solid ${Theme.BorderColor};
//   padding-bottom: 0.75rem;
//   margin-bottom: 1.25rem;

//   h3 {
//     font-size: 1.2rem;
//     color: ${Theme.PrimaryGreen};
//     font-family: serif;
//   }

//   span {
//     font-size: 0.7rem;
//     background: ${Theme.SurfaceAlt};
//     color: ${Theme.GoldAccent};
//     padding: 4px 10px;
//     border-radius: 12px;
//     font-weight: 700;
//     letter-spacing: 0.05em;
//     text-transform: uppercase;
//     border: 1px solid ${Theme.BorderColor};
//   }
// `;

// const ImageGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
//   gap: 1.2rem;
// `;

// const ImageCard = styled.div`
//   background: ${Theme.SurfaceAlt};
//   border: 1px solid ${Theme.BorderColor};
//   border-radius: 8px;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;

//   img {
//     width: 100%;
//     height: 130px;
//     object-fit: cover;
//   }

//   .card-body {
//     padding: 10px;
//     display: flex;
//     flex-direction: column;
//     flex: 1;
//     justify-content: space-between;

//     p {
//       font-size: 0.8rem;
//       font-weight: 600;
//       color: ${Theme.TextDark};
//       margin-bottom: 8px;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }
//   }
// `;

// const ActionRow = styled.div`
//   display: flex;
//   gap: 6px;
// `;

// const Btn = styled.button`
//   flex: 1;
//   padding: 6px;
//   background: ${Theme.PrimaryGreen};
//   color: ${Theme.SurfaceBg};
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 0.75rem;
//   font-weight: 600;
//   transition: opacity 0.2s;

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }

//   &:hover {
//     opacity: 0.9;
//   }

//   ${(props) =>
//     props.$delete &&
//     `
//       background: ${Theme.DangerColor};
//     `}
// `;

// /* ---------------- MODAL ---------------- */

// const ModalBackground = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(17, 56, 43, 0.4);
//   backdrop-filter: blur(4px);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 400;
// `;

// const ModalCard = styled.div`
//   width: 440px;
//   background: ${Theme.SurfaceBg};
//   padding: 2rem;
//   border-radius: 12px;
//   border: 1px solid ${Theme.BorderColor};
//   box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
//   overflow-y: scroll;
//   max-height: 95vh;

//   h2 {
//     color: ${Theme.PrimaryGreen};
//     font-family: serif;
//     font-size: 1.5rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 600;
//   font-size: 0.85rem;
//   color: ${Theme.PrimaryGreen};
//   margin-top: 1rem;
//   display: block;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px 12px;
//   border-radius: 6px;
//   border: 1px solid ${Theme.BorderColor};
//   background: ${Theme.SurfaceAlt};
//   font-size: 0.9rem;
//   color: ${Theme.TextDark};
//   margin-top: 6px;
//   outline: none;

//   &:focus {
//     border-color: ${Theme.GoldAccent};
//   }
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px 12px;
//   border-radius: 6px;
//   border: 1px solid ${Theme.BorderColor};
//   background: ${Theme.SurfaceAlt};
//   font-size: 0.9rem;
//   color: ${Theme.TextDark};
//   margin-top: 6px;
//   outline: none;

//   &:focus {
//     border-color: ${Theme.GoldAccent};
//   }
// `;

// const ModalFooter = styled.div`
//   margin-top: 1.8rem;
//   display: flex;
//   justify-content: space-between;
//   gap: 1rem;
// `;

// const PreviewBtn = styled.span`
//   display: inline-block;
//   cursor: pointer;
//   text-align: center;
//   width: 100%;
//   margin-top: 6px;
//   padding: 9px 12px;
//   background: ${Theme.GoldAccent};
//   color: ${Theme.PrimaryGreen};
//   border: none;
//   border-radius: 6px;
//   font-weight: 700;
//   font-size: 0.8rem;
//   letter-spacing: 0.05em;
//   text-transform: uppercase;
//   transition: opacity 0.2s ease;

//   &:hover {
//     opacity: 0.9;
//   }
// `;

// const PreviewGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 8px;
//   margin-top: 10px;
//   max-height: 150px;
//   overflow-y: auto;

//   img {
//     width: 100%;
//     height: 70px;
//     object-fit: cover;
//     border-radius: 4px;
//     border: 1px solid ${Theme.BorderColor};
//   }
// `;

// /* ---------------- COMPONENT ---------------- */

// export default function GalleryManager() {
//   const [galleryItems, setGalleryItems] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [categoryId, setCategoryId] = useState("properties");
//   const [imageFiles, setImageFiles] = useState([]); // Changed to support multiple files
//   const [imagePreviews, setImagePreviews] = useState([]); // Array of previews
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const galleryRef = collection(db, "galleryImages");

//   // Real-time listener for all gallery items
//   useEffect(() => {
//     const q = query(galleryRef);

//     const unsubscribeSnapshot = onSnapshot(
//       q,
//       (snapshot) => {
//         const arr = [];
//         snapshot.forEach((docSnap) => {
//           arr.push({ id: docSnap.id, ...docSnap.data() });
//         });
//         setGalleryItems(arr);
//       },
//       (error) => {
//         console.error("Firestore snapshot error:", error);
//       }
//     );

//     return () => {
//       unsubscribeSnapshot();
//     };
//   }, []);

//   const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     // Validate files
//     for (let file of files) {
//       if (!file.type.startsWith("image/")) {
//         Swal.fire("Error", "Only image files are allowed", "error");
//         return;
//       }
//     }

//     setImageFiles(files);
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews(previews);
//   };

//   const compressImage = async (file, maxSizeKB = 150) => {
//     if (!file) throw new Error("No file provided");
//     const options = {
//       maxSizeMB: maxSizeKB / 1024,
//       maxWidthOrHeight: 1200,
//       useWebWorker: true,
//       fileType: "image/jpeg",
//     };

//     try {
//       return await imageCompression(file, options);
//     } catch (error) {
//       console.error("Compression failed:", error);
//       return file;
//     }
//   };

//   const uploadToCloudinary = async (blob) => {
//     const data = new FormData();
//     data.append("file", blob, "gallery.jpg");
//     data.append("upload_preset", "bees_interior");
//     data.append("folder", "pinkles_gallery");

//     const res = await fetch("https://api.cloudinary.com/v1_1/aqxyleoh/image/upload", {
//       method: "POST",
//       body: data,
//     });

//     const json = await res.json();
//     if (!res.ok) {
//       throw new Error(json.error?.message || "Upload failed");
//     }

//     return json.secure_url;
//   };

//   const openNewModal = () => {
//     setModalOpen(true);
//     setEditingId(null);
//     setTitle("");
//     setCategoryId("properties");
//     resetImageState();
//   };

//   const openEditModal = (item) => {
//     setModalOpen(true);
//     setEditingId(item.id);
//     setTitle(item.title);
//     setCategoryId(item.categoryId);
//     setImageFiles([]);
//     setImagePreviews([item.url]); // Single preview for editing existing image
//   };

//   const saveGalleryItem = async () => {
//     const user = auth.currentUser;
//     if (!user) {
//       Swal.fire("Unauthorized", "Please log in again to perform this action.", "error");
//       return;
//     }

//     if (!title.trim() && !editingId) {
//       return Swal.fire("Missing Field", "Image title prefix/name is required.", "warning");
//     }

//     if (!categoryId) {
//       return Swal.fire("Missing Field", "Please select a category.", "warning");
//     }

//     if (!editingId && imageFiles.length === 0) {
//       return Swal.fire("Missing Field", "Please select at least one image file.", "warning");
//     }

//     setLoading(true);
//     Swal.fire({
//       title: editingId ? "Updating image..." : `Uploading ${imageFiles.length} image(s)...`,
//       text: "Please wait while we process your request.",
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       if (editingId) {
//         // Single update when editing an existing card
//         let imageUrl = imagePreviews[0];
//         if (imageFiles.length > 0) {
//           const compressedBlob = await compressImage(imageFiles[0], 150);
//           imageUrl = await uploadToCloudinary(compressedBlob);
//         }

//         await updateDoc(doc(db, "galleryImages", editingId), {
//           title,
//           categoryId,
//           url: imageUrl,
//         });
//         Swal.fire("Updated!", "Gallery image updated successfully.", "success");
//       } else {
//         // Bulk upload loop for multiple images
//         for (let i = 0; i < imageFiles.length; i++) {
//           const file = imageFiles[i];
//           const compressedBlob = await compressImage(file, 150);
//           const imageUrl = await uploadToCloudinary(compressedBlob);

//           // Generate sequential title if uploading multiple
//           const itemTitle = imageFiles.length > 1 ? `${title.trim()} (${i + 1})` : title.trim();

//           await addDoc(galleryRef, {
//             userId: user.uid,
//             title: itemTitle,
//             categoryId,
//             url: imageUrl,
//             createdAt: serverTimestamp(),
//           });
//         }

//         Swal.fire("Success!", `${imageFiles.length} new image(s) added to gallery.`, "success");
//       }

//       setModalOpen(false);
//       resetImageState();
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", error.message || "Something went wrong.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteGalleryItem = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Delete image?",
//       text: "This image will be removed from your gallery permanently.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete",
//       confirmButtonColor: Theme.DangerColor,
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       await deleteDoc(doc(db, "galleryImages", id));
//       Swal.fire("Deleted!", "Image removed successfully.", "success");
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "Could not delete image.", "error");
//     }
//   };

//   const resetImageState = () => {
//     setImageFiles([]);
//     setImagePreviews([]);
//   };

//   const structuredGallery = galleryCategories.map((cat) => ({
//     ...cat,
//     images: galleryItems.filter((item) => item.categoryId === cat.id),
//   }));

//   return (
//     <Container>
//       <ContentWrapper>
//         <Title>Manage Gallery Images</Title>
//         <SubtitleText>Upload, organize, and manage imagery across your various portfolio sections.</SubtitleText>

//         <PlusButton onClick={openNewModal}>+ Upload New Gallery Images</PlusButton>

//         {structuredGallery.map((category) => (
//           <CategorySection key={category.id}>
//             <CategoryHeader>
//               <h3>{category.title}</h3>
//               <span>{category.tag} ({category.images.length})</span>
//             </CategoryHeader>

//             {category.images.length === 0 ? (
//               <p style={{ fontSize: "0.85rem", color: Theme.TextMuted, fontStyle: "italic" }}>
//                 No images uploaded in this category yet.
//               </p>
//             ) : (
//               <ImageGrid>
//                 {category.images.map((img) => (
//                   <ImageCard key={img.id}>
//                     <img src={img.url} alt={img.title} />
//                     <div className="card-body">
//                       <p title={img.title}>{img.title}</p>
//                       <ActionRow>
//                         <Btn onClick={() => openEditModal(img)}>Edit</Btn>
//                         <Btn $delete onClick={() => deleteGalleryItem(img.id)}>Delete</Btn>
//                       </ActionRow>
//                     </div>
//                   </ImageCard>
//                 ))}
//               </ImageGrid>
//             )}
//           </CategorySection>
//         ))}

//         {modalOpen && (
//           <ModalBackground
//             onClick={() => {
//               setModalOpen(false);
//               resetImageState();
//             }}
//           >
//             <ModalCard onClick={(e) => e.stopPropagation()}>
//               <h2 style={{ marginBottom: "1rem" }}>
//                 {editingId ? "Edit Gallery Image" : "Upload Multiple Images"}
//               </h2>

//               <Label>Image Title / Base Name</Label>
//               <Input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="e.g. Executive Dining Table"
//               />

//               <Label>Gallery Category</Label>
//               <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
//                 {galleryCategories.map((cat) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.title} ({cat.tag})
//                   </option>
//                 ))}
//               </Select>

//               <Label>Select Images {editingId ? "" : "(Multiple allowed)"}</Label>
//               <input
//                 id="galleryUpload"
//                 type="file"
//                 accept="image/*"
//                 multiple={!editingId}
//                 onChange={handleImageSelect}
//                 style={{ display: "none" }}
//               />
//               <label htmlFor="galleryUpload">
//                 <PreviewBtn as="span">Select / Change Images</PreviewBtn>
//               </label>

//               {imagePreviews.length > 0 && (
//                 <PreviewGrid>
//                   {imagePreviews.map((src, idx) => (
//                     <img key={idx} src={src} alt={`Preview ${idx + 1}`} />
//                   ))}
//                 </PreviewGrid>
//               )}

//               <ModalFooter>
//                 <Btn onClick={saveGalleryItem} disabled={loading}>
//                   {editingId ? "Update" : `Upload (${imageFiles.length})`}
//                 </Btn>
//                 <Btn
//                   $delete
//                   onClick={() => {
//                     setModalOpen(false);
//                     resetImageState();
//                   }}
//                 >
//                   Cancel
//                 </Btn>
//               </ModalFooter>
//             </ModalCard>
//           </ModalBackground>
//         )}
//       </ContentWrapper>
//     </Container>
//   );
// }








"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { auth, db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import imageCompression from "browser-image-compression";

/* ================= THEME COLORS (Light Mode) ================= */
const Theme = {
  PageBg: "#FAF8F4",        // Soft warm ivory/cream background
  SurfaceBg: "#FFFFFF",     // Pure white for card sections
  SurfaceAlt: "#F2EDE4",    // Light cream for inputs/cards
  PrimaryGreen: "#11382b",  // Deep forest green primary color
  GoldAccent: "#B28A2E",    // Muted warm gold accent
  TextDark: "#1E293B",      // Main dark text
  TextMuted: "#64748B",     // Secondary text
  BorderColor: "#E2D9CE",   // Warm border tone
  DangerColor: "#C53030",   // Refined red for delete buttons
};

const galleryCategories = [
  { id: "properties", tag: "PROPERTIES", title: "Properties Gallery", subtitle: "Bold property imagery for the Properties page." },
  { id: "bedroom", tag: "BEDROOM", title: "Bedroom", subtitle: "Interior collection — Bedroom" },
  { id: "living-room", tag: "LIVING ROOM", title: "Living Room", subtitle: "Interior collection — Living Room" },
  { id: "wall-decor", tag: "WALL DÉCOR", title: "Wall Decor", subtitle: "Interior collection — Wall Decor" },
  { id: "dining-sets", tag: "DINING SETS", title: "Dining Sets", subtitle: "Interior collection — Dining Sets" },
  { id: "hallway", tag: "HALLWAY", title: "Hallway", subtitle: "Interior collection — Hallway" },
  { id: "tv-units", tag: "TV UNITS", title: "TV Units", subtitle: "Interior collection — TV Units" },
  { id: "centre-pieces", tag: "CENTRE PIECES", title: "Centre Pieces", subtitle: "Interior collection — Centre Pieces" },
  { id: "mirrors", tag: "MIRRORS", title: "Mirrors", subtitle: "Interior collection — Mirrors" },
  { id: "flowers-vases", tag: "FLOWERS AND FLOWER VASE", title: "Flowers and flower vase", subtitle: "Interior collection — Flowers and Flower vase" },
  { id: "kitchen", tag: "KITCHEN", title: "Kitchen", subtitle: "Interior collection — Kitchen" },
  { id: "chairs", tag: "CHAIRS", title: "Chairs", subtitle: "Interior collection — Chairs" },
];

const Container = styled.div`
  background-color: ${Theme.PageBg};
  min-height: 100vh;
  padding: 3rem 1.5rem 5rem;
  color: ${Theme.TextDark};
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${Theme.PrimaryGreen};
  font-family: serif;
`;

const SubtitleText = styled.p`
  color: ${Theme.TextMuted};
  font-size: 0.95rem;
  margin-top: 0.5rem;
`;

const PlusButton = styled.button`
  padding: 10px 22px;
  margin-top: 20px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: ${Theme.PrimaryGreen};
  color: ${Theme.SurfaceBg};
  border: none;
  box-shadow: 0 4px 12px rgba(17, 56, 43, 0.15);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${Theme.GoldAccent};
    color: ${Theme.PrimaryGreen};
  }
`;

const CategorySection = styled.div`
  margin-top: 2.5rem;
  background: ${Theme.SurfaceBg};
  padding: 1.75rem;
  border-radius: 10px;
  border: 1px solid ${Theme.BorderColor};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid ${Theme.BorderColor};
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;

  h3 {
    font-size: 1.2rem;
    color: ${Theme.PrimaryGreen};
    font-family: serif;
  }

  span {
    font-size: 0.7rem;
    background: ${Theme.SurfaceAlt};
    color: ${Theme.GoldAccent};
    padding: 4px 10px;
    border-radius: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: 1px solid ${Theme.BorderColor};
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.2rem;
  margin-bottom: 1.5rem;
`;

const ImageCard = styled.div`
  background: ${Theme.SurfaceAlt};
  border: 1px solid ${Theme.BorderColor};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  img, video {
    width: 100%;
    height: 130px;
    object-fit: cover;
  }

  .card-body {
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;

    p {
      font-size: 0.8rem;
      font-weight: 600;
      color: ${Theme.TextDark};
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 6px;
`;

const Btn = styled.button`
  flex: 1;
  padding: 6px;
  background: ${Theme.PrimaryGreen};
  color: ${Theme.SurfaceBg};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover {
    opacity: 0.9;
  }

  ${(props) =>
    props.$delete &&
    `
      background: ${Theme.DangerColor};
    `}
`;

/* ---------------- MODAL ---------------- */

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(17, 56, 43, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 400;
`;

const ModalCard = styled.div`
  width: 440px;
  background: ${Theme.SurfaceBg};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid ${Theme.BorderColor};
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  max-height: 95vh;

  h2 {
    color: ${Theme.PrimaryGreen};
    font-family: serif;
    font-size: 1.5rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.85rem;
  color: ${Theme.PrimaryGreen};
  margin-top: 1rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid ${Theme.BorderColor};
  background: ${Theme.SurfaceAlt};
  font-size: 0.9rem;
  color: ${Theme.TextDark};
  margin-top: 6px;
  outline: none;

  &:focus {
    border-color: ${Theme.GoldAccent};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid ${Theme.BorderColor};
  background: ${Theme.SurfaceAlt};
  font-size: 0.9rem;
  color: ${Theme.TextDark};
  margin-top: 6px;
  outline: none;

  &:focus {
    border-color: ${Theme.GoldAccent};
  }
`;

const ModalFooter = styled.div`
  margin-top: 1.8rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const PreviewBtn = styled.span`
  display: inline-block;
  cursor: pointer;
  text-align: center;
  width: 100%;
  margin-top: 6px;
  padding: 9px 12px;
  background: ${Theme.GoldAccent};
  color: ${Theme.PrimaryGreen};
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
  max-height: 150px;
  overflow-y: auto;

  img, video {
    width: 100%;
    height: 70px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid ${Theme.BorderColor};
  }
`;

/* ---------------- COMPONENT ---------------- */

export default function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [videoItems, setVideoItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState("image"); // "image" or "video"
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("properties");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const galleryRef = collection(db, "galleryImages");
  const videoRef = collection(db, "galleryVideos");

  // Real-time listener for all gallery images
  useEffect(() => {
    const q = query(galleryRef);
    const unsubscribeSnapshot = onSnapshot(
      q,
      (snapshot) => {
        const arr = [];
        snapshot.forEach((docSnap) => {
          arr.push({ id: docSnap.id, ...docSnap.data() });
        });
        setGalleryItems(arr);
      },
      (error) => {
        console.error("Firestore snapshot error:", error);
      }
    );

    return () => {
      unsubscribeSnapshot();
    };
  }, []);

  // Real-time listener for all gallery videos
  useEffect(() => {
    const q = query(videoRef);
    const unsubscribeSnapshot = onSnapshot(
      q,
      (snapshot) => {
        const arr = [];
        snapshot.forEach((docSnap) => {
          arr.push({ id: docSnap.id, ...docSnap.data() });
        });
        setVideoItems(arr);
      },
      (error) => {
        console.error("Firestore snapshot error:", error);
      }
    );

    return () => {
      unsubscribeSnapshot();
    };
  }, []);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (let file of files) {
      if (!file.type.startsWith("image/")) {
        Swal.fire("Error", "Only image files are allowed", "error");
        return;
      }
    }

    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleVideoSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (let file of files) {
      if (!file.type.startsWith("video/")) {
        Swal.fire("Error", "Only video files are allowed", "error");
        return;
      }
    }

    setVideoFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setVideoPreviews(previews);
  };

  const compressImage = async (file, maxSizeKB = 150) => {
    if (!file) throw new Error("No file provided");
    const options = {
      maxSizeMB: maxSizeKB / 1024,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      fileType: "image/jpeg",
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Compression failed:", error);
      return file;
    }
  };

  const uploadToCloudinary = async (fileToUpload, resourceType = "image") => {
    const data = new FormData();
    data.append("file", fileToUpload);
    data.append("upload_preset", "bees_interior");
    data.append("folder", "pinkles_gallery");

    const res = await fetch(`https://api.cloudinary.com/v1_1/aqxyleoh/${resourceType}/upload`, {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error?.message || "Upload failed");
    }

    return json.secure_url;
  };

  const openNewModal = () => {
    setModalOpen(true);
    setEditingId(null);
    setTitle("");
    setCategoryId("properties");
    setMediaType("image");
    resetMediaState();
  };

  const openEditModal = (item, type = "image") => {
    setModalOpen(true);
    setEditingId(item.id);
    setTitle(item.title);
    setCategoryId(item.categoryId);
    setMediaType(type);
    if (type === "image") {
      setImageFiles([]);
      setImagePreviews([item.url]);
      setVideoFiles([]);
      setVideoPreviews([]);
    } else {
      setVideoFiles([]);
      setVideoPreviews([item.url]);
      setImageFiles([]);
      setImagePreviews([]);
    }
  };

  const saveGalleryItem = async () => {
    const user = auth.currentUser;
    if (!user) {
      Swal.fire("Unauthorized", "Please log in again to perform this action.", "error");
      return;
    }

    if (!title.trim() && !editingId) {
      return Swal.fire("Missing Field", "Title prefix/name is required.", "warning");
    }

    if (!categoryId) {
      return Swal.fire("Missing Field", "Please select a category.", "warning");
    }

    if (!editingId) {
      if (mediaType === "image" && imageFiles.length === 0) {
        return Swal.fire("Missing Field", "Please select at least one image file.", "warning");
      }
      if (mediaType === "video" && videoFiles.length === 0) {
        return Swal.fire("Missing Field", "Please select at least one video file.", "warning");
      }
    }

    setLoading(true);
    const count = mediaType === "image" ? imageFiles.length : videoFiles.length;
    Swal.fire({
      title: editingId ? `Updating ${mediaType}...` : `Uploading ${count} ${mediaType}(s)...`,
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      if (editingId) {
        let mediaUrl = mediaType === "image" ? imagePreviews[0] : videoPreviews[0];
        if (mediaType === "image" && imageFiles.length > 0) {
          const compressedBlob = await compressImage(imageFiles[0], 150);
          mediaUrl = await uploadToCloudinary(compressedBlob, "image");
        } else if (mediaType === "video" && videoFiles.length > 0) {
          mediaUrl = await uploadToCloudinary(videoFiles[0], "video");
        }

        const targetRef = mediaType === "image" ? doc(db, "galleryImages", editingId) : doc(db, "galleryVideos", editingId);
        await updateDoc(targetRef, {
          title,
          categoryId,
          url: mediaUrl,
        });
        Swal.fire("Updated!", `Gallery ${mediaType} updated successfully.`, "success");
      } else {
        if (mediaType === "image") {
          for (let i = 0; i < imageFiles.length; i++) {
            const file = imageFiles[i];
            const compressedBlob = await compressImage(file, 150);
            const imageUrl = await uploadToCloudinary(compressedBlob, "image");
            const itemTitle = imageFiles.length > 1 ? `${title.trim()} (${i + 1})` : title.trim();

            await addDoc(galleryRef, {
              userId: user.uid,
              title: itemTitle,
              categoryId,
              url: imageUrl,
              createdAt: serverTimestamp(),
            });
          }
          Swal.fire("Success!", `${imageFiles.length} new image(s) added to gallery.`, "success");
        } else {
          for (let i = 0; i < videoFiles.length; i++) {
            const file = videoFiles[i];
            const videoUrl = await uploadToCloudinary(file, "video");
            const itemTitle = videoFiles.length > 1 ? `${title.trim()} (${i + 1})` : title.trim();

            await addDoc(videoRef, {
              userId: user.uid,
              title: itemTitle,
              categoryId,
              url: videoUrl,
              createdAt: serverTimestamp(),
            });
          }
          Swal.fire("Success!", `${videoFiles.length} new video(s) added to gallery.`, "success");
        }
      }

      setModalOpen(false);
      resetMediaState();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteGalleryItem = async (id, type = "image") => {
    const confirm = await Swal.fire({
      title: `Delete ${type}?`,
      text: `This ${type} will be removed from your gallery permanently.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: Theme.DangerColor,
    });

    if (!confirm.isConfirmed) return;

    try {
      const targetRef = type === "image" ? doc(db, "galleryImages", id) : doc(db, "galleryVideos", id);
      await deleteDoc(targetRef);
      Swal.fire("Deleted!", `${type.charAt(0).toUpperCase() + type.slice(1)} removed successfully.`, "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", `Could not delete ${type}.`, "error");
    }
  };

  const resetMediaState = () => {
    setImageFiles([]);
    setImagePreviews([]);
    setVideoFiles([]);
    setVideoPreviews([]);
  };

  const structuredGallery = galleryCategories.map((cat) => ({
    ...cat,
    images: galleryItems.filter((item) => item.categoryId === cat.id),
    videos: videoItems.filter((item) => item.categoryId === cat.id),
  }));

  return (
    <Container>
      <ContentWrapper>
        <Title>Manage Gallery Media</Title>
        <SubtitleText>Upload, organize, and manage imagery and videos across your various portfolio sections.</SubtitleText>

        <PlusButton onClick={openNewModal}>+ Upload New Gallery Media</PlusButton>

        {structuredGallery.map((category) => {
          const totalCount = category.images.length + category.videos.length;
          return (
            <CategorySection key={category.id}>
              <CategoryHeader>
                <h3>{category.title}</h3>
                <span>{category.tag} ({totalCount})</span>
              </CategoryHeader>

              {totalCount === 0 ? (
                <p style={{ fontSize: "0.85rem", color: Theme.TextMuted, fontStyle: "italic" }}>
                  No images or videos uploaded in this category yet.
                </p>
              ) : (
                <>
                  {category.images.length > 0 && (
                    <div style={{ marginBottom: category.videos.length > 0 ? "1.5rem" : "0" }}>
                      <p style={{ fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.75rem", color: Theme.PrimaryGreen }}>Images</p>
                      <ImageGrid>
                        {category.images.map((img) => (
                          <ImageCard key={img.id}>
                            <img src={img.url} alt={img.title} />
                            <div className="card-body">
                              <p title={img.title}>{img.title}</p>
                              <ActionRow>
                                <Btn onClick={() => openEditModal(img, "image")}>Edit</Btn>
                                <Btn $delete onClick={() => deleteGalleryItem(img.id, "image")}>Delete</Btn>
                              </ActionRow>
                            </div>
                          </ImageCard>
                        ))}
                      </ImageGrid>
                    </div>
                  )}

                  {category.videos.length > 0 && (
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.75rem", color: Theme.PrimaryGreen }}>Videos</p>
                      <ImageGrid>
                        {category.videos.map((vid) => (
                          <ImageCard key={vid.id}>
                            <video src={vid.url} controls={false} muted />
                            <div className="card-body">
                              <p title={vid.title}>{vid.title}</p>
                              <ActionRow>
                                <Btn onClick={() => openEditModal(vid, "video")}>Edit</Btn>
                                <Btn $delete onClick={() => deleteGalleryItem(vid.id, "video")}>Delete</Btn>
                              </ActionRow>
                            </div>
                          </ImageCard>
                        ))}
                      </ImageGrid>
                    </div>
                  )}
                </>
              )}
            </CategorySection>
          );
        })}

        {modalOpen && (
          <ModalBackground
            onClick={() => {
              setModalOpen(false);
              resetMediaState();
            }}
          >
            <ModalCard onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: "1rem" }}>
                {editingId ? `Edit Gallery ${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}` : "Upload Multiple Media"}
              </h2>

              {!editingId && (
                <>
                  <Label>Media Type</Label>
                  <Select value={mediaType} onChange={(e) => {
                    setMediaType(e.target.value);
                    resetMediaState();
                  }}>
                    <option value="image">Images</option>
                    <option value="video">Videos</option>
                  </Select>
                </>
              )}

              <Label>Title / Base Name</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Executive Dining Table"
              />

              <Label>Gallery Category</Label>
              <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                {galleryCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title} ({cat.tag})
                  </option>
                ))}
              </Select>

              {mediaType === "image" ? (
                <>
                  <Label>Select Images {editingId ? "" : "(Multiple allowed)"}</Label>
                  <input
                    id="galleryUpload"
                    type="file"
                    accept="image/*"
                    multiple={!editingId}
                    onChange={handleImageSelect}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="galleryUpload">
                    <PreviewBtn as="span">Select / Change Images</PreviewBtn>
                  </label>

                  {imagePreviews.length > 0 && (
                    <PreviewGrid>
                      {imagePreviews.map((src, idx) => (
                        <img key={idx} src={src} alt={`Preview ${idx + 1}`} />
                      ))}
                    </PreviewGrid>
                  )}
                </>
              ) : (
                <>
                  <Label>Select Videos {editingId ? "" : "(Multiple allowed)"}</Label>
                  <input
                    id="galleryVideoUpload"
                    type="file"
                    accept="video/*"
                    multiple={!editingId}
                    onChange={handleVideoSelect}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="galleryVideoUpload">
                    <PreviewBtn as="span">Select / Change Videos</PreviewBtn>
                  </label>

                  {videoPreviews.length > 0 && (
                    <PreviewGrid>
                      {videoPreviews.map((src, idx) => (
                        <video key={idx} src={src} controls />
                      ))}
                    </PreviewGrid>
                  )}
                </>
              )}

              <ModalFooter>
                <Btn onClick={saveGalleryItem} disabled={loading}>
                  {editingId ? "Update" : `Upload (${mediaType === "image" ? imageFiles.length : videoFiles.length})`}
                </Btn>
                <Btn
                  $delete
                  onClick={() => {
                    setModalOpen(false);
                    resetMediaState();
                  }}
                >
                  Cancel
                </Btn>
              </ModalFooter>
            </ModalCard>
          </ModalBackground>
        )}
      </ContentWrapper>
    </Container>
  );
}