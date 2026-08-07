# Low-Level Design (LLD) - DevTrack AI

## 1. Database Schema Definitions
Data structures inside MongoDB are mapped via Mongoose schemas:

### 1.1 User Schema
```typescript
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

### 1.2 Project Schema
```typescript
const ProjectSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Planning', 'In Progress', 'Completed'], default: 'Planning' },
  createdAt: { type: Date, default: Date.now }
});
```

### 1.3 Task Schema
```typescript
const TaskSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  dueDate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

---

## 2. API Endpoints Contract

### 2.1 Authentication (/api/auth)
- `POST /signup`: Register a new profile.
- `POST /login`: Authenticate credentials, return JWT token.

### 2.2 Projects (/api/projects)
- `GET /`: Retrieve all projects for the authenticated user.
- `GET /:id`: Retrieve a specific project details (with task list).
- `POST /`: Create a project.
- `PUT /:id`: Update metadata or status.
- `DELETE /:id`: Delete project and all associated tasks.

### 2.3 Tasks (/api/tasks)
- `POST /:projectId`: Create a task inside a project.
- `PUT /:taskId`: Update task status (`To Do`, `In Progress`, `Done`) or priority.
- `DELETE /:taskId`: Delete a task.

---

## 3. Frontend Props contracts

### 3.1 DepthText Props
```typescript
interface DepthTextProps {
  text?: string;
  layers?: number;
  depth?: number;
  faceColor?: string;
  depthColor?: string;
  tilt?: number;
  pointerTracking?: boolean;
  smoothing?: number;
  perspective?: number;
  autoOrbit?: boolean;
  orbitSpeed?: number;
  fontSize?: string;
  fontWeight?: number | string;
  shadow?: boolean;
  className?: string;
  style?: CSSProperties;
}
```

### 3.2 TaskCard Props
```typescript
export interface Task {
  id: string | number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
}

interface TaskCardProps {
  task: Task;
  onDelete?: (id: string | number) => void;
  onStatusChange?: (id: string | number, newStatus: "To Do" | "In Progress" | "Done") => void;
}
```

---

## 4. State Management
- **Dashboard & Board UI**: Uses standard React `useState` hooks to manage local UI states, input values, and list array filter criteria.
- **Backend Sync**: Axios intercepts requests and hooks into `localStorage` to fetch stored JWT tokens, sending them inside request header parameters for authorization verification.
